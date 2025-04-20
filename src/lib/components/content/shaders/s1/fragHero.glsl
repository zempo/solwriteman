#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_audio;
uniform vec2 u_mouse;
uniform vec3 u_theme;
uniform float u_shader_idx;

const float PI = 3.14159265359;
const float TAU = 6.28318530718;
// http://dev.thi.ng/gradients/
vec3 c_palette( float t, vec3 a, vec3 b, vec3 c, vec3 d) {
  return a + b * cos(TAU * (c * t + d));
}

float line(float x, float y, float line_width, float edge_width){
  return smoothstep(x-line_width/2.0-edge_width, x-line_width/2.0, y) - smoothstep(x+line_width/2.0, x+line_width/2.0+edge_width, y);
}

float circle(vec2 pt, vec2 center, float radius, float line_width, float edge_thickness){
  pt -= center;
  float len = length(pt);
  float result = smoothstep(radius-line_width/2.0-edge_thickness, radius-line_width/2.0, len) - smoothstep(radius + line_width/2.0, radius + line_width/2.0 + edge_thickness, len);
return result;
}

float distFromCircle(vec2 p, vec2 center) {
  vec2 ratio = u_resolution.xy / u_resolution.x;
  return distance(p*ratio, center*ratio);
}

float random2d(vec2 coord, float seed){
  const float a = 12.9898;
  const float b = 78.233;
  const float c = 43758.543123;

  return fract(sin(dot(coord.xy, vec2(a, b)) + seed) * c);
}

// 2D Noise based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);

  // Four corners in 2D of a tile
  float a = random2d(i, 0.0);
  float b = random2d(i + vec2(1.0, 0.0), 0.0);
  float c = random2d(i + vec2(0.0, 1.0), 0.0);
  float d = random2d(i + vec2(1.0, 1.0), 0.0);
  // Smooth Interpolation

  // Cubic Hermine Curve.  Same as SmoothStep()
  vec2 u = f*f*(3.0-2.0*f);
  // u = smoothstep(0.,1.,f);

  // Mix 4 coorners percentages
  return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float psrdnoise(vec2 x, vec2 period, float alpha, out vec2 gradient) {

	// Transform to simplex space (axis-aligned hexagonal grid)
	vec2 uv = vec2(x.x + x.y*0.5, x.y);

	// Determine which simplex we're in, with i0 being the "base"
	vec2 i0 = floor(uv);
	vec2 f0 = fract(uv);
	// o1 is the offset in simplex space to the second corner
	float cmp = step(f0.y, f0.x);
	vec2 o1 = vec2(cmp, 1.0-cmp);

	// Enumerate the remaining simplex corners
	vec2 i1 = i0 + o1;
	vec2 i2 = i0 + vec2(1.0, 1.0);

	// Transform corners back to texture space
	vec2 v0 = vec2(i0.x - i0.y * 0.5, i0.y);
	vec2 v1 = vec2(v0.x + o1.x - o1.y * 0.5, v0.y + o1.y);
	vec2 v2 = vec2(v0.x + 0.5, v0.y + 1.0);

	// Compute vectors from v to each of the simplex corners
	vec2 x0 = x - v0;
	vec2 x1 = x - v1;
	vec2 x2 = x - v2;

	vec3 iu, iv;
	vec3 xw, yw;

	// Wrap to periods, if desired
	if(any(greaterThan(period, vec2(0.0)))) {
		xw = vec3(v0.x, v1.x, v2.x);
		yw = vec3(v0.y, v1.y, v2.y);
		if(period.x > 0.0)
			xw = mod(vec3(v0.x, v1.x, v2.x), period.x);
		if(period.y > 0.0)
			yw = mod(vec3(v0.y, v1.y, v2.y), period.y);
		// Transform back to simplex space and fix rounding errors
		iu = floor(xw + 0.5*yw + 0.5);
		iv = floor(yw + 0.5);
	} else { // Shortcut if neither x nor y periods are specified
		iu = vec3(i0.x, i1.x, i2.x);
		iv = vec3(i0.y, i1.y, i2.y);
	}

	// Compute one pseudo-random hash value for each corner
	vec3 hash = mod(iu, 289.0);
	hash = mod((hash*51.0 + 2.0)*hash + iv, 289.0);
	hash = mod((hash*34.0 + 10.0)*hash, 289.0);

	// Pick a pseudo-random angle and add the desired rotation
	vec3 psi = hash * 0.07482 + alpha;
	vec3 gx = cos(psi);
	vec3 gy = sin(psi);

	// Reorganize for dot products below
	vec2 g0 = vec2(gx.x,gy.x);
	vec2 g1 = vec2(gx.y,gy.y);
	vec2 g2 = vec2(gx.z,gy.z);

	// Radial decay with distance from each simplex corner
	vec3 w = 0.8 - vec3(dot(x0, x0), dot(x1, x1), dot(x2, x2));
	w = max(w, 0.0);
	vec3 w2 = w * w;
	vec3 w4 = w2 * w2;

	// The value of the linear ramp from each of the corners
	vec3 gdotx = vec3(dot(g0, x0), dot(g1, x1), dot(g2, x2));

	// Multiply by the radial decay and sum up the noise value
	float n = dot(w4, gdotx);

	// Compute the first order partial derivatives
	vec3 w3 = w2 * w;
	vec3 dw = -8.0 * w3 * gdotx;
	vec2 dn0 = w4.x * g0 + dw.x * x0;
	vec2 dn1 = w4.y * g1 + dw.y * x1;
	vec2 dn2 = w4.z * g2 + dw.z * x2;
	gradient = 10.9 * (dn0 + dn1 + dn2);

	// Scale the return value to fit nicely into the range [-1,1]
	return 10.9 * n;
}

// *ripple
vec3 mk_cp2(vec2 pt, float len, float rate) {
  // Adjust color based on audio data
  float cInt = smoothstep(0.0, 1.0, u_audio);
  float colorIntensity_2 = smoothstep(0.0, 1.0, u_audio); // Map audio value [0,1]
  colorIntensity_2 *= .75;
 
  vec3 c = vec3(0.0);
  for(float i = 0.0; i < len; i++){
    float t = 1. * TAU * i / 100.0 * rate;
    float x = tan(3.0*t);
    float y = sin(4.0*t);
    vec2 uv_out = 0.5 * vec2(x,y);
    float r = fract(x)+colorIntensity_2;
    float g = 0.6 - r + colorIntensity_2;
    c += 0.01 / (length(pt-uv_out)) * vec3(r,g,0.9-colorIntensity_2*2.0);
  }

  vec3 c_dillute = c_palette(
    pt.x / 10. + (sin(u_time*0.15)*0.15) - colorIntensity_2,
    vec3(0.000, 0.500, 0.500), vec3(0.000, 0.500, 0.500), vec3(0.000, 0.500, 0.333), vec3(0.000, 0.500, 0.667)
  );

  return (c + c_dillute);
}

float fbm(vec2 pt, float len, float rate) {
  float v = 0.0;
  float a = .75;

  vec2 shift = vec2(100.0);
  mat2 rot = mat2(cos(a), sin(a), -sin(a), cos(a));
  for(float i = 0.0; i < len; i++){
    float dir = mod(i, 2.0) > 0.5 ? 1.0 : -1.0;
    v += a * noise(pt - 0.105 * dir * rate);
    pt = rot * pt * 2.0 + shift;
    a *= 0.5;
  }
  return v;
}
// clouds https://glslsandbox.com/e#109550.0
vec3 mk_cp3(vec2 pt, float rate, float p) {
  float colorIntensity_3 = smoothstep(0.0, 1.0, u_audio); // Map audio value [0,1]
  colorIntensity_3 *= .75;

  vec2 q = vec2(0.0);
  q.x = fbm(pt + abs(sin(u_time / 10000.0)) * rate, 6.0, rate);
  q.y = fbm(pt + vec2(1.0), 6.0, rate);
  vec2 r = vec2(0.0);
  r.x = fbm(pt + 1.0 * q + vec2(1.7, 1.2) + 0.15 * rate, 6.0, rate);
  r.y = fbm(pt + 1.0 * q + vec2(8.3, 2.8) + 0.126 * rate, 6.0, rate);
  float f = fbm(pt + r, 6.0, rate);
    
  // DS: hornidev
  vec3 color = mix(
    vec3(1.0, 1.0, 1.3),
    vec3(1.5, 1.0, 1.0),
    clamp((f * f) * 10.5, 1.2, 15.5)
  );

  color = mix(
    color,
    vec3(0.4, 0.4, 0.3765),
    clamp(length(q), 1.0, 2.0)
  );

  color = mix(
    color,
    vec3(0.7529, 0.4314, 0.1294),
    clamp(length(r.x), 0.0, 5.0)
  );
  vec3 color2 = mix(
    color,
    vec3(0.6863, 0.5412, 0.251),
    clamp((f * f) * 10.5, 0.0, 1.0)
  );

  color = (f * f * f * .150 + 0.5 * 1.7 * 0.10 + 0.9 + colorIntensity_3 * f) * color + (p/4.);
  return color;
}

// watercolor
vec3 mk_cp4(vec2 pt, float len, float rate) {
  float colorIntensity_4 = smoothstep(0.0, 1.0, u_audio); // Map audio value [0,1]
  colorIntensity_4 *= 1.;

  float l;
  for(float i = 0.0; i < len; i++){
    l = length(vec2(pt.x, pt.y));

    pt.x = pt.x - cos(pt.y + sin(l)) + cos(rate / 9.0);
    pt.y = pt.y + sin(pt.x + cos(l)) + sin(rate / 12.0); 
  }
  vec3 cp_fin = vec3(tan(l * (0.01 + (sin(rate + (colorIntensity_4*0.1)) / 60.0))) * 0.5 + (colorIntensity_4 * 0.5), cos(l * 0.2) + colorIntensity_4, cos(l * 0.1));
  return cp_fin;
}

vec3 mk_cp5(vec2 pt, float len, float rate) {
  float colorIntensity_5 = smoothstep(0.0, 1.0, u_audio); // Map audio value [0,1]
  colorIntensity_5 *= 2.0;

  float rate_5 = u_time * 0.15;

  for(float k = 0.0; k < len; k++){
    pt += sin(pt.yx * vec2(1.6, 1.1) * (k + 11.0) + rate * k * vec2(3.4, 0.5) / 10.0) * 0.1;
  }

  float p1 = (abs(sin(pt.y + rate * 0.1) + sin(pt.x + rate * 0.1))) * 0.5;
  vec3 c1 = vec3(0.3569 + colorIntensity_5, 0.7765 + colorIntensity_5, 0.8392);
  // vec3 c_out = (c1*p1); 
  vec3 c2 = c_palette(
    p1,
    vec3(0.000, 0.333, 0.667),vec3(-0.052, 1.000, 1.000),vec3(1.088, -0.862, 0.138),vec3(0.448, -0.052, 0.778)
  );

  vec3 c3 = vec3(0.9098/rate, 0.898/rate, 0.7216/rate);
  vec3 c4 = vec3(0.898, 0.2627, 0.051) + u_theme;

  float f = 0.0;
  float g = 0.0;
  float h = 0.0;
  for(float i = 0.0; i < 40.0; i++){
    if(floor(41.0) < i){
      break;      
    }
    float s = sin(rate_5 + i * PI / 2.0) * 0.8;
		float c = cos(rate_5 + i * PI / 2.0) * 0.8;
		float d = abs(pt.x + c);
		float e = abs(pt.y + s);
		f += 0.001 / d;
		g += 0.001 / e;
		h += 0.00003 / (d * e);
  }

  vec3 c1c = vec3(f*c3+g*c4+vec3(h));

  vec3 cp_out = ((c1c)+(p1*c1)+(c1c-0.52));  

  return cp_out;
}

vec3 mk_cp6(vec2 pt, float rate) {
  float colorIntensity_6 = smoothstep(0.0, 1.0, u_audio); // Map audio value [0,1]
  colorIntensity_6 *= .50;

  vec2 pt_reset = pt;
  vec3 c_fin = vec3(0.2, 0.2, 0.2);

  float freq = 8.0;
  for(float i = 0.0; i < 3.0; i++){
    pt = fract(pt*2.0) - 0.5;
    float p_1 = length(pt) * exp(-length(pt_reset));
    float p_2 = length(pt_reset);

    vec3 c_1 = c_palette(
      p_2 + (i*0.4) + rate + colorIntensity_6,
      vec3(0.6941, 0.2235, 0.2627), vec3(0.5765, 0.3451, 0.2275), vec3(0.3922, 0.3922, 0.2627), vec3(0.1686, 0.5373, 0.4824));

    p_1 = sin((p_1 * freq) + rate + colorIntensity_6) / freq;
    p_1 = abs(p_1);
    // p_1 /= p_1b;

    // p_1 = smoothstep(0.0, 0.1, p_1);
    // p_1 = 0.02 / p_1;
    p_1 = 0.01 / p_1;
    c_fin += (p_1) * c_1;
  }
  return c_fin;
}

vec3 mk_cp6b(vec2 pt, float rate) {
  float colorIntensity_7 = smoothstep(0.0, 1.0, u_audio); // Map audio value [0,1]
  colorIntensity_7 *= .15;


  vec2 mouseNorm = u_mouse;
  float mX = mouseNorm.x * 2.0 - 1.0;
  float mY = mouseNorm.y * 2.0 - 1.0;
  
float reaction = sin(pt.x * 30.0 + rate) * sin(pt.y * 30.0);  
float diffusion = smoothstep(-0.2, 0.2 + sin(pt.x * 3.0 + rate) + sin(pt.x * 20.0 + 100.0/pt.y * (-(mX)) * (.0005+colorIntensity_7)), reaction); 

  // vec3 c_out = mix(c1, , );
  vec3 c1 = vec3(diffusion * (0.1+abs(mX)-abs(mY*0.2)) - (mX/2.0), reaction - (0.1+abs(mX)) + colorIntensity_7,.2 + diffusion * abs(mX));
  vec3 c2 = vec3(reaction * abs(mX) - (mX/5.0), diffusion, reaction * abs(mX));
  vec3 c_fin = mix(c1, c1, sin(pt.x * 2.0 + rate));

  return c_fin;
}

void main(){
 vec2 uv = ((gl_FragCoord.xy - (u_resolution.xy * 0.5)) / u_resolution.y);
  // Adjust color based on audio data
  float colorIntensity = smoothstep(0.0, 1.0, u_audio); // Map audio value [0,1]
  colorIntensity *= 0.5;

 vec2 uv1 = uv * 2.0;
 uv1.y *= (colorIntensity * .5) + 1.0;
 uv1.x *= (colorIntensity * .5) + 1.0;
 vec2 uv2 = uv * 2.0;
 vec2 uv3 = uv * vec2(2.0+(0.1*sin(u_time*.5)), 2.0+(1.0*-cos(u_time*.5)));
 vec2 uv4 = uv * vec2(12.0, 10.0);
 vec2 uv5 = .70 * uv;
 vec2 uv6 = 10.0 * uv;
 vec2 uv6b = 1.0 * uv;
 vec2 uv6b2 = 1.35 * uv;
 vec2 uv7 = 1.0 * uv;


 float rate1 = u_time * 1.0;
 float rate2 = u_time * .05;
 // Map u_time to a 0 to 30-second cycle using mod
 float wrappedTime = mod(u_time * 2.0, 360.0);
 // Use sin to modulate wrappedTime to a smooth periodic oscillation
 float sineTime = (sin(wrappedTime * PI / 360.0) + 1.0) * 30.0; // Oscillates between 0 and 60
 float rate3 = sineTime;
 float rate4 = u_time;
 float rate5 = u_time;
 float rate6 = u_time * .6;
 float rate7 = u_time;

  //* Ripples -- if ripple index, run ripple effect
  float duration = 3.;
  float delay = 0.10; 
  float total_time = duration + delay;
  float time_in_phase = mod(rate1, total_time);

  // Effect phase: Ripple effect
  float effect_time = time_in_phase - delay; // Time relative to the start of the effect
  float len = fract(length(uv1) * .25); 
  vec2 ripple = uv1 + uv1 / len * (0.03) * cos(len * 100.0 - effect_time * 4.0);
  float delta = (sin(effect_time * (2.0 * PI / duration)) + 1.0) / 2.0;
  uv2 = mix(ripple, uv2, delta + colorIntensity);
  

  // float angle = u_time * 0.05 + (colorIntensity / 8.0);
  float angle = u_time * 0.05;
  for (int i = 0; i < 8; i++){
    uv = abs(uv);
    uv -= 0.5 - (colorIntensity * 0.07);
    uv *= 1.1;
    uv *= mat2(
      cos(angle), -sin(angle),
      sin(angle), cos(angle)  
    );
  } 

  vec3 c1 = vec3(
    length(uv + vec2(colorIntensity, colorIntensity)), 
    length(uv + vec2(0.2 + colorIntensity, -0.3)),
    length(uv + vec2(0.4 + colorIntensity, -0.2))
  );

  vec3 c2 = mk_cp2(uv2, 25.0, rate2);

  float l1 = length(uv3);
  vec2 rm = vec2(sin(cos(rate3) * l1), cos(sin(rate3) * 0.5) * dot(uv3*uv3, uv3));
  uv3 = vec2( uv3.x*rm.x - uv3.y*rm.y, uv3.x*rm.y - uv3.y*rm.x * dot(uv3,uv3));
  float p1 = abs(l1-2.0)+(cos(.15*(atan(uv3.x,uv3.y))))*0.13+colorIntensity;
  vec3 c3 = mk_cp3(uv3, rate3, p1);
  vec3 c4 = mk_cp4(uv4, 12.0, rate4);
  vec3 c5 = mk_cp5(uv5, 5.0, rate5);
  vec3 c6 = mk_cp5(uv6, 8.0, rate5) + (mk_cp6(uv6b*2.5, rate6) * 0.2);

  vec2 gradient = vec2(1.0, 1.0);
  float n = psrdnoise(vec2(3.) * uv7 + (colorIntensity * 0.25), vec2(0.), .2 * rate7 * PI, gradient);
  uv7 = fract(uv7 * 4.0 * n) - 0.5;
  float p7 = cos((uv7.x + n * 0.1 + exp(uv7.y + 2.0 * uv7.x) + 0.2) * PI);
  // vec3 c7_1 = vec3(0.3098, 0.7373, 0.5255);
  // vec3 c7_1 = vec3(0.651, 0.3725, 0.7804);
  // vec3 cc = vec3(0.3725, 0.7059, 0.7804)
  // 0.651, 0.3725, 0.7804
  vec3 c7_1 = u_theme;
  vec3 c7_2 = vec3(0.298, 0.251, 0.3451);
  vec3 c7 = mix(c7_1,c7_2,p7 * n + (colorIntensity * 2.0));

  vec3 c6b = mk_cp6b(uv6b2, rate7);

    // c1,c7,c4,c2,c5,c6b
  vec3 a1[6] = vec3[6](
  c1,c6b,c7,c4,c2,c5
  );
  vec3 a_out1 = a1[int(u_shader_idx)];

  vec3 c_out = a_out1;
 
  // float loop_time = cos(6.0);
  // Calculate the alpha value based on time
  float a_1_time = 3.0; // Duration in seconds for the fade
  float a_1_lim = 0.5;   // Target alpha value
  // Calculate the alpha based on the time elapsed
  float a_1 = smoothstep(0.0, a_1_time, u_time) * a_1_lim;
  // Ensure alpha does not go below 0.5
  if (a_1 < 0.8) {
    a_1 = 1.0;
  }
  // float a_1 = alpha;

  gl_FragColor = vec4(c_out, 1.0);
}