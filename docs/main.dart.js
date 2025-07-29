(function dartProgram(){function copyProperties(a,b){var t=Object.keys(a)
for(var s=0;s<t.length;s++){var r=t[s]
b[r]=a[r]}}function mixinPropertiesHard(a,b){var t=Object.keys(a)
for(var s=0;s<t.length;s++){var r=t[s]
if(!b.hasOwnProperty(r)){b[r]=a[r]}}}function mixinPropertiesEasy(a,b){Object.assign(b,a)}var z=function(){var t=function(){}
t.prototype={p:{}}
var s=new t()
if(!(Object.getPrototypeOf(s)&&Object.getPrototypeOf(s).p===t.prototype.p))return false
try{if(typeof navigator!="undefined"&&typeof navigator.userAgent=="string"&&navigator.userAgent.indexOf("Chrome/")>=0)return true
if(typeof version=="function"&&version.length==0){var r=version()
if(/^\d+\.\d+\.\d+\.\d+$/.test(r))return true}}catch(q){}return false}()
function inherit(a,b){a.prototype.constructor=a
a.prototype["$i"+a.name]=a
if(b!=null){if(z){Object.setPrototypeOf(a.prototype,b.prototype)
return}var t=Object.create(b.prototype)
copyProperties(a.prototype,t)
a.prototype=t}}function inheritMany(a,b){for(var t=0;t<b.length;t++){inherit(b[t],a)}}function mixinEasy(a,b){mixinPropertiesEasy(b.prototype,a.prototype)
a.prototype.constructor=a}function mixinHard(a,b){mixinPropertiesHard(b.prototype,a.prototype)
a.prototype.constructor=a}function lazy(a,b,c,d){var t=a
a[b]=t
a[c]=function(){if(a[b]===t){a[b]=d()}a[c]=function(){return this[b]}
return a[b]}}function lazyFinal(a,b,c,d){var t=a
a[b]=t
a[c]=function(){if(a[b]===t){var s=d()
if(a[b]!==t){A.dr(b)}a[b]=s}var r=a[b]
a[c]=function(){return r}
return r}}function makeConstList(a){a.$flags=7
return a}function convertToFastObject(a){function t(){}t.prototype=a
new t()
return a}function convertAllToFastObject(a){for(var t=0;t<a.length;++t){convertToFastObject(a[t])}}var y=0
function instanceTearOffGetter(a,b){var t=null
return a?function(c){if(t===null)t=A.b7(b)
return new t(c,this)}:function(){if(t===null)t=A.b7(b)
return new t(this,null)}}function staticTearOffGetter(a){var t=null
return function(){if(t===null)t=A.b7(a).prototype
return t}}var x=0
function tearOffParameters(a,b,c,d,e,f,g,h,i,j){if(typeof h=="number"){h+=x}return{co:a,iS:b,iI:c,rC:d,dV:e,cs:f,fs:g,fT:h,aI:i||0,nDA:j}}function installStaticTearOff(a,b,c,d,e,f,g,h){var t=tearOffParameters(a,true,false,c,d,e,f,g,h,false)
var s=staticTearOffGetter(t)
a[b]=s}function installInstanceTearOff(a,b,c,d,e,f,g,h,i,j){c=!!c
var t=tearOffParameters(a,false,c,d,e,f,g,h,i,!!j)
var s=instanceTearOffGetter(c,t)
a[b]=s}function setOrUpdateInterceptorsByTag(a){var t=v.interceptorsByTag
if(!t){v.interceptorsByTag=a
return}copyProperties(a,t)}function setOrUpdateLeafTags(a){var t=v.leafTags
if(!t){v.leafTags=a
return}copyProperties(a,t)}function updateTypes(a){var t=v.types
var s=t.length
t.push.apply(t,a)
return s}function updateHolder(a,b){copyProperties(b,a)
return a}var hunkHelpers=function(){var t=function(a,b,c,d,e){return function(f,g,h,i){return installInstanceTearOff(f,g,a,b,c,d,[h],i,e,false)}},s=function(a,b,c,d){return function(e,f,g,h){return installStaticTearOff(e,f,a,b,c,[g],h,d)}}
return{inherit:inherit,inheritMany:inheritMany,mixin:mixinEasy,mixinHard:mixinHard,installStaticTearOff:installStaticTearOff,installInstanceTearOff:installInstanceTearOff,_instance_0u:t(0,0,null,["$0"],0),_instance_1u:t(0,1,null,["$1"],0),_instance_2u:t(0,2,null,["$2"],0),_instance_0i:t(1,0,null,["$0"],0),_instance_1i:t(1,1,null,["$1"],0),_instance_2i:t(1,2,null,["$2"],0),_static_0:s(0,null,["$0"],0),_static_1:s(1,null,["$1"],0),_static_2:s(2,null,["$2"],0),makeConstList:makeConstList,lazy:lazy,lazyFinal:lazyFinal,updateHolder:updateHolder,convertToFastObject:convertToFastObject,updateTypes:updateTypes,setOrUpdateInterceptorsByTag:setOrUpdateInterceptorsByTag,setOrUpdateLeafTags:setOrUpdateLeafTags}}()
function initializeDeferredHunk(a){x=v.types.length
a(hunkHelpers,v,w,$)}var J={
bb(a,b,c,d){return{i:a,p:b,e:c,x:d}},
b8(a){var t,s,r,q,p,o=a[v.dispatchPropertyName]
if(o==null)if($.b9==null){A.de()
o=a[v.dispatchPropertyName]}if(o!=null){t=o.p
if(!1===t)return o.i
if(!0===t)return a
s=Object.getPrototypeOf(a)
if(t===s)return o.i
if(o.e===s)throw A.b(A.bq("Return interceptor for "+A.S(t(a,o))))}r=a.constructor
if(r==null)q=null
else{p=$.aP
if(p==null)p=$.aP=v.getIsolateTag("_$dart_js")
q=r[p]}if(q!=null)return q
q=A.dk(a)
if(q!=null)return q
if(typeof a=="function")return B.n
t=Object.getPrototypeOf(a)
if(t==null)return B.e
if(t===Object.prototype)return B.e
if(typeof r=="function"){p=$.aP
if(p==null)p=$.aP=v.getIsolateTag("_$dart_js")
Object.defineProperty(r,p,{value:B.a,enumerable:false,writable:true,configurable:true})
return B.a}return B.a},
a0(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.ab.prototype
return J.ac.prototype}if(typeof a=="string")return J.J.prototype
if(a==null)return J.I.prototype
if(typeof a=="boolean")return J.aa.prototype
if(Array.isArray(a))return J.p.prototype
if(typeof a!="object"){if(typeof a=="function")return J.w.prototype
if(typeof a=="symbol")return J.M.prototype
if(typeof a=="bigint")return J.K.prototype
return a}if(a instanceof A.k)return a
return J.b8(a)},
bS(a){if(typeof a=="string")return J.J.prototype
if(a==null)return a
if(Array.isArray(a))return J.p.prototype
if(typeof a!="object"){if(typeof a=="function")return J.w.prototype
if(typeof a=="symbol")return J.M.prototype
if(typeof a=="bigint")return J.K.prototype
return a}if(a instanceof A.k)return a
return J.b8(a)},
d9(a){if(a==null)return a
if(Array.isArray(a))return J.p.prototype
if(typeof a!="object"){if(typeof a=="function")return J.w.prototype
if(typeof a=="symbol")return J.M.prototype
if(typeof a=="bigint")return J.K.prototype
return a}if(a instanceof A.k)return a
return J.b8(a)},
c_(a){return J.d9(a).gB(a)},
bc(a){return J.bS(a).gj(a)},
c0(a){return J.a0(a).gi(a)},
a4(a){return J.a0(a).h(a)},
a9:function a9(){},
aa:function aa(){},
I:function I(){},
L:function L(){},
x:function x(){},
ap:function ap(){},
T:function T(){},
w:function w(){},
K:function K(){},
M:function M(){},
p:function p(a){this.$ti=a},
aB:function aB(a){this.$ti=a},
a5:function a5(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
ad:function ad(){},
ab:function ab(){},
ac:function ac(){},
J:function J(){}},A={b_:function b_(){},
dj(a){var t,s
for(t=$.a3.length,s=0;s<t;++s)if(a===$.a3[s])return!0
return!1},
aC:function aC(a){this.a=a},
ae:function ae(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
l:function l(){},
bY(a){var t=v.mangledGlobalNames[a]
if(t!=null)return t
return"minified:"+a},
dL(a,b){var t
if(b!=null){t=b.x
if(t!=null)return t}return u.p.b(a)},
S(a){var t
if(typeof a=="string")return a
if(typeof a=="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
t=J.a4(a)
return t},
aD(a){return A.ce(a)},
ce(a){var t,s,r,q
if(a instanceof A.k)return A.n(A.a1(a),null)
t=J.a0(a)
if(t===B.m||t===B.o||u.o.b(a)){s=B.b(a)
if(s!=="Object"&&s!=="")return s
r=a.constructor
if(typeof r=="function"){q=r.name
if(typeof q=="string"&&q!=="Object"&&q!=="")return q}}return A.n(A.a1(a),null)},
ck(a){if(typeof a=="number"||A.b5(a))return J.a4(a)
if(typeof a=="string")return JSON.stringify(a)
if(a instanceof A.A)return a.h(0)
return"Instance of '"+A.aD(a)+"'"},
E(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
cj(a){var t=A.E(a).getFullYear()+0
return t},
ch(a){var t=A.E(a).getMonth()+1
return t},
cf(a){var t=A.E(a).getDate()+0
return t},
bm(a){var t=A.E(a).getHours()+0
return t},
bn(a){var t=A.E(a).getMinutes()+0
return t},
ci(a){var t=A.E(a).getSeconds()+0
return t},
cg(a){var t=A.E(a).getMilliseconds()+0
return t},
ba(a,b){if(a==null)J.bc(a)
throw A.b(A.bQ(a,b))},
bQ(a,b){var t,s="index"
if(!A.bK(b))return new A.H(!0,b,s,null)
t=J.bc(a)
if(b<0||b>=t)return new A.aA(t,!0,b,s,"Index out of range")
return new A.aE(!0,b,s,"Value not in range")},
b(a){return A.bU(new Error(),a)},
bU(a,b){var t
if(b==null)b=new A.aK()
a.dartException=b
t=A.dt
if("defineProperty" in Object){Object.defineProperty(a,"message",{get:t})
a.name=""}else a.toString=t
return a},
dt(){return J.a4(this.dartException)},
dq(a){throw A.b(a)},
bX(a,b){throw A.bU(b,a)},
ds(a,b,c){var t
if(b==null)b=0
if(c==null)c=0
t=Error()
A.bX(A.cN(a,b,c),t)},
cN(a,b,c){var t,s,r,q,p,o,n,m,l
if(typeof b=="string")t=b
else{s="[]=;add;removeWhere;retainWhere;removeRange;setRange;setInt8;setInt16;setInt32;setUint8;setUint16;setUint32;setFloat32;setFloat64".split(";")
r=s.length
q=b
if(q>r){c=q/r|0
q%=r}t=s[q]}p=typeof c=="string"?c:"modify;remove from;add to".split(";")[c]
o=u.j.b(a)?"list":"ByteData"
n=a.$flags|0
m="a "
if((n&4)!==0)l="constant "
else if((n&2)!==0){l="unmodifiable "
m="an "}else l=(n&1)!==0?"fixed-length ":""
return new A.aM("'"+t+"': Cannot "+p+" "+m+l+o)},
dp(a){throw A.b(A.bi(a))},
c7(a1){var t,s,r,q,p,o,n,m,l,k,j=a1.co,i=a1.iS,h=a1.iI,g=a1.nDA,f=a1.aI,e=a1.fs,d=a1.cs,c=e[0],b=d[0],a=j[c],a0=a1.fT
a0.toString
t=i?Object.create(new A.aG().constructor.prototype):Object.create(new A.a7(null,null).constructor.prototype)
t.$initialize=t.constructor
s=i?function static_tear_off(){this.$initialize()}:function tear_off(a2,a3){this.$initialize(a2,a3)}
t.constructor=s
s.prototype=t
t.$_name=c
t.$_target=a
r=!i
if(r)q=A.bh(c,a,h,g)
else{t.$static_name=c
q=a}t.$S=A.c3(a0,i,h)
t[b]=q
for(p=q,o=1;o<e.length;++o){n=e[o]
if(typeof n=="string"){m=j[n]
l=n
n=m}else l=""
k=d[o]
if(k!=null){if(r)n=A.bh(l,n,h,g)
t[k]=n}if(o===f)p=n}t.$C=p
t.$R=a1.rC
t.$D=a1.dV
return s},
c3(a,b,c){if(typeof a=="number")return a
if(typeof a=="string"){if(b)throw A.b("Cannot compute signature for static tearoff.")
return function(d,e){return function(){return e(this,d)}}(a,A.c1)}throw A.b("Error in functionType of tearoff")},
c4(a,b,c,d){var t=A.bg
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,t)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,t)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,t)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,t)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,t)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,t)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,t)}},
bh(a,b,c,d){if(c)return A.c6(a,b,d)
return A.c4(b.length,d,a,b)},
c5(a,b,c,d){var t=A.bg,s=A.c2
switch(b?-1:a){case 0:throw A.b(new A.aF("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,s,t)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,s,t)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,s,t)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,s,t)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,s,t)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,s,t)
default:return function(e,f,g){return function(){var r=[g(this)]
Array.prototype.push.apply(r,arguments)
return e.apply(f(this),r)}}(d,s,t)}},
c6(a,b,c){var t,s
if($.be==null)$.be=A.bd("interceptor")
if($.bf==null)$.bf=A.bd("receiver")
t=b.length
s=A.c5(t,c,a,b)
return s},
b7(a){return A.c7(a)},
c1(a,b){return A.aR(v.typeUniverse,A.a1(a.a),b)},
bg(a){return a.a},
c2(a){return a.b},
bd(a){var t,s,r,q=new A.a7("receiver","interceptor"),p=Object.getOwnPropertyNames(q)
p.$flags=1
t=p
for(p=t.length,s=0;s<p;++s){r=t[s]
if(q[r]===a)return r}throw A.b(new A.H(!1,null,null,"Field name "+a+" not found."))},
dM(a){throw A.b(new A.aN(a))},
da(a){return v.getIsolateTag(a)},
dk(a){var t,s,r,q,p,o=A.bE($.bT.$1(a)),n=$.aU[o]
if(n!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:n,enumerable:false,writable:true,configurable:true})
return n.i}t=$.aY[o]
if(t!=null)return t
s=v.interceptorsByTag[o]
if(s==null){r=A.cL($.bO.$2(a,o))
if(r!=null){n=$.aU[r]
if(n!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:n,enumerable:false,writable:true,configurable:true})
return n.i}t=$.aY[r]
if(t!=null)return t
s=v.interceptorsByTag[r]
o=r}}if(s==null)return null
t=s.prototype
q=o[0]
if(q==="!"){n=A.aZ(t)
$.aU[o]=n
Object.defineProperty(a,v.dispatchPropertyName,{value:n,enumerable:false,writable:true,configurable:true})
return n.i}if(q==="~"){$.aY[o]=t
return t}if(q==="-"){p=A.aZ(t)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:p,enumerable:false,writable:true,configurable:true})
return p.i}if(q==="+")return A.bV(a,t)
if(q==="*")throw A.b(A.bq(o))
if(v.leafTags[o]===true){p=A.aZ(t)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:p,enumerable:false,writable:true,configurable:true})
return p.i}else return A.bV(a,t)},
bV(a,b){var t=Object.getPrototypeOf(a)
Object.defineProperty(t,v.dispatchPropertyName,{value:J.bb(b,t,null,null),enumerable:false,writable:true,configurable:true})
return b},
aZ(a){return J.bb(a,!1,null,!!a.$io)},
dm(a,b,c){var t=b.prototype
if(v.leafTags[a]===true)return A.aZ(t)
else return J.bb(t,c,null,null)},
de(){if(!0===$.b9)return
$.b9=!0
A.df()},
df(){var t,s,r,q,p,o,n,m
$.aU=Object.create(null)
$.aY=Object.create(null)
A.dd()
t=v.interceptorsByTag
s=Object.getOwnPropertyNames(t)
if(typeof window!="undefined"){window
r=function(){}
for(q=0;q<s.length;++q){p=s[q]
o=$.bW.$1(p)
if(o!=null){n=A.dm(p,t[p],o)
if(n!=null){Object.defineProperty(o,v.dispatchPropertyName,{value:n,enumerable:false,writable:true,configurable:true})
r.prototype=o}}}}for(q=0;q<s.length;++q){p=s[q]
if(/^[A-Za-z_]/.test(p)){m=t[p]
t["!"+p]=m
t["~"+p]=m
t["-"+p]=m
t["+"+p]=m
t["*"+p]=m}}},
dd(){var t,s,r,q,p,o,n=B.f()
n=A.G(B.h,A.G(B.i,A.G(B.c,A.G(B.c,A.G(B.j,A.G(B.k,A.G(B.l(B.b),n)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){t=dartNativeDispatchHooksTransformer
if(typeof t=="function")t=[t]
if(Array.isArray(t))for(s=0;s<t.length;++s){r=t[s]
if(typeof r=="function")n=r(n)||n}}q=n.getTag
p=n.getUnknownTag
o=n.prototypeForTag
$.bT=new A.aV(q)
$.bO=new A.aW(p)
$.bW=new A.aX(o)},
G(a,b){return a(b)||b},
d8(a,b){var t=b.length,s=v.rttc[""+t+";"+a]
if(s==null)return null
if(t===0)return s
if(t===s.length)return s.apply(null,b)
return s(b)},
A:function A(){},
av:function av(){},
aJ:function aJ(){},
aG:function aG(){},
a7:function a7(a,b){this.a=a
this.b=b},
aN:function aN(a){this.a=a},
aF:function aF(a){this.a=a},
aV:function aV(a){this.a=a},
aW:function aW(a){this.a=a},
aX:function aX(a){this.a=a},
B(a,b,c){if(a>>>0!==a||a>=c)throw A.b(A.bQ(b,a))},
af:function af(){},
P:function P(){},
ag:function ag(){},
D:function D(){},
N:function N(){},
O:function O(){},
ah:function ah(){},
ai:function ai(){},
aj:function aj(){},
ak:function ak(){},
al:function al(){},
am:function am(){},
an:function an(){},
Q:function Q(){},
ao:function ao(){},
U:function U(){},
V:function V(){},
W:function W(){},
X:function X(){},
bo(a,b){var t=b.c
return t==null?b.c=A.b3(a,b.x,!0):t},
b0(a,b){var t=b.c
return t==null?b.c=A.Z(a,"bk",[b.x]):t},
bp(a){var t=a.w
if(t===6||t===7||t===8)return A.bp(a.x)
return t===12||t===13},
cl(a){return a.as},
bR(a){return A.as(v.typeUniverse,a,!1)},
z(a0,a1,a2,a3){var t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a=a1.w
switch(a){case 5:case 1:case 2:case 3:case 4:return a1
case 6:t=a1.x
s=A.z(a0,t,a2,a3)
if(s===t)return a1
return A.bA(a0,s,!0)
case 7:t=a1.x
s=A.z(a0,t,a2,a3)
if(s===t)return a1
return A.b3(a0,s,!0)
case 8:t=a1.x
s=A.z(a0,t,a2,a3)
if(s===t)return a1
return A.by(a0,s,!0)
case 9:r=a1.y
q=A.F(a0,r,a2,a3)
if(q===r)return a1
return A.Z(a0,a1.x,q)
case 10:p=a1.x
o=A.z(a0,p,a2,a3)
n=a1.y
m=A.F(a0,n,a2,a3)
if(o===p&&m===n)return a1
return A.b1(a0,o,m)
case 11:l=a1.x
k=a1.y
j=A.F(a0,k,a2,a3)
if(j===k)return a1
return A.bz(a0,l,j)
case 12:i=a1.x
h=A.z(a0,i,a2,a3)
g=a1.y
f=A.d5(a0,g,a2,a3)
if(h===i&&f===g)return a1
return A.bx(a0,h,f)
case 13:e=a1.y
a3+=e.length
d=A.F(a0,e,a2,a3)
p=a1.x
o=A.z(a0,p,a2,a3)
if(d===e&&o===p)return a1
return A.b2(a0,o,d,!0)
case 14:c=a1.x
if(c<a3)return a1
b=a2[c-a3]
if(b==null)return a1
return b
default:throw A.b(A.a6("Attempted to substitute unexpected RTI kind "+a))}},
F(a,b,c,d){var t,s,r,q,p=b.length,o=A.aS(p)
for(t=!1,s=0;s<p;++s){r=b[s]
q=A.z(a,r,c,d)
if(q!==r)t=!0
o[s]=q}return t?o:b},
d6(a,b,c,d){var t,s,r,q,p,o,n=b.length,m=A.aS(n)
for(t=!1,s=0;s<n;s+=3){r=b[s]
q=b[s+1]
p=b[s+2]
o=A.z(a,p,c,d)
if(o!==p)t=!0
m.splice(s,3,r,q,o)}return t?m:b},
d5(a,b,c,d){var t,s=b.a,r=A.F(a,s,c,d),q=b.b,p=A.F(a,q,c,d),o=b.c,n=A.d6(a,o,c,d)
if(r===s&&p===q&&n===o)return b
t=new A.aq()
t.a=r
t.b=p
t.c=n
return t},
bN(a,b){a[v.arrayRti]=b
return a},
bP(a){var t=a.$S
if(t!=null){if(typeof t=="number")return A.dc(t)
return a.$S()}return null},
dg(a,b){var t
if(A.bp(b))if(a instanceof A.A){t=A.bP(a)
if(t!=null)return t}return A.a1(a)},
a1(a){if(a instanceof A.k)return A.bI(a)
if(Array.isArray(a))return A.aT(a)
return A.b4(J.a0(a))},
aT(a){var t=a[v.arrayRti],s=u.b
if(t==null)return s
if(t.constructor!==s.constructor)return s
return t},
bI(a){var t=a.$ti
return t!=null?t:A.b4(a)},
b4(a){var t=a.constructor,s=t.$ccache
if(s!=null)return s
return A.cU(a,t)},
cU(a,b){var t=a instanceof A.A?Object.getPrototypeOf(Object.getPrototypeOf(a)).constructor:b,s=A.cH(v.typeUniverse,t.name)
b.$ccache=s
return s},
dc(a){var t,s=v.types,r=s[a]
if(typeof r=="string"){t=A.as(v.typeUniverse,r,!1)
s[a]=t
return t}return r},
db(a){return A.C(A.bI(a))},
d4(a){var t=a instanceof A.A?A.bP(a):null
if(t!=null)return t
if(u.R.b(a))return J.c0(a).a
if(Array.isArray(a))return A.aT(a)
return A.a1(a)},
C(a){var t=a.r
return t==null?a.r=A.bF(a):t},
bF(a){var t,s,r=a.as,q=r.replace(/\*/g,"")
if(q===r)return a.r=new A.aQ(a)
t=A.as(v.typeUniverse,q,!0)
s=t.r
return s==null?t.r=A.bF(t):s},
r(a){return A.C(A.as(v.typeUniverse,a,!1))},
cT(a){var t,s,r,q,p,o,n=this
if(n===u.K)return A.u(n,a,A.cZ)
if(!A.v(n))t=n===u._
else t=!0
if(t)return A.u(n,a,A.d2)
t=n.w
if(t===7)return A.u(n,a,A.cR)
if(t===1)return A.u(n,a,A.bL)
s=t===6?n.x:n
r=s.w
if(r===8)return A.u(n,a,A.cV)
if(s===u.S)q=A.bK
else if(s===u.i||s===u.H)q=A.cY
else if(s===u.N)q=A.d0
else q=s===u.y?A.b5:null
if(q!=null)return A.u(n,a,q)
if(r===9){p=s.x
if(s.y.every(A.dh)){n.f="$i"+p
if(p==="d")return A.u(n,a,A.cX)
return A.u(n,a,A.d1)}}else if(r===11){o=A.d8(s.x,s.y)
return A.u(n,a,o==null?A.bL:o)}return A.u(n,a,A.cP)},
u(a,b,c){a.b=c
return a.b(b)},
cS(a){var t,s=this,r=A.cO
if(!A.v(s))t=s===u._
else t=!0
if(t)r=A.cM
else if(s===u.K)r=A.cK
else{t=A.a2(s)
if(t)r=A.cQ}s.a=r
return s.a(a)},
at(a){var t=a.w,s=!0
if(!A.v(a))if(!(a===u._))if(!(a===u.A))if(t!==7)if(!(t===6&&A.at(a.x)))s=t===8&&A.at(a.x)||a===u.P||a===u.T
return s},
cP(a){var t=this
if(a==null)return A.at(t)
return A.di(v.typeUniverse,A.dg(a,t),t)},
cR(a){if(a==null)return!0
return this.x.b(a)},
d1(a){var t,s=this
if(a==null)return A.at(s)
t=s.f
if(a instanceof A.k)return!!a[t]
return!!J.a0(a)[t]},
cX(a){var t,s=this
if(a==null)return A.at(s)
if(typeof a!="object")return!1
if(Array.isArray(a))return!0
t=s.f
if(a instanceof A.k)return!!a[t]
return!!J.a0(a)[t]},
cO(a){var t=this
if(a==null){if(A.a2(t))return a}else if(t.b(a))return a
A.bG(a,t)},
cQ(a){var t=this
if(a==null)return a
else if(t.b(a))return a
A.bG(a,t)},
bG(a,b){throw A.b(A.cx(A.br(a,A.n(b,null))))},
br(a,b){return A.az(a)+": type '"+A.n(A.d4(a),null)+"' is not a subtype of type '"+b+"'"},
cx(a){return new A.ar("TypeError: "+a)},
m(a,b){return new A.ar("TypeError: "+A.br(a,b))},
cV(a){var t=this,s=t.w===6?t.x:t
return s.x.b(a)||A.b0(v.typeUniverse,s).b(a)},
cZ(a){return a!=null},
cK(a){if(a!=null)return a
throw A.b(A.m(a,"Object"))},
d2(a){return!0},
cM(a){return a},
bL(a){return!1},
b5(a){return!0===a||!1===a},
dA(a){if(!0===a)return!0
if(!1===a)return!1
throw A.b(A.m(a,"bool"))},
dC(a){if(!0===a)return!0
if(!1===a)return!1
if(a==null)return a
throw A.b(A.m(a,"bool"))},
dB(a){if(!0===a)return!0
if(!1===a)return!1
if(a==null)return a
throw A.b(A.m(a,"bool?"))},
dD(a){if(typeof a=="number")return a
throw A.b(A.m(a,"double"))},
dF(a){if(typeof a=="number")return a
if(a==null)return a
throw A.b(A.m(a,"double"))},
dE(a){if(typeof a=="number")return a
if(a==null)return a
throw A.b(A.m(a,"double?"))},
bK(a){return typeof a=="number"&&Math.floor(a)===a},
bD(a){if(typeof a=="number"&&Math.floor(a)===a)return a
throw A.b(A.m(a,"int"))},
dH(a){if(typeof a=="number"&&Math.floor(a)===a)return a
if(a==null)return a
throw A.b(A.m(a,"int"))},
dG(a){if(typeof a=="number"&&Math.floor(a)===a)return a
if(a==null)return a
throw A.b(A.m(a,"int?"))},
cY(a){return typeof a=="number"},
dI(a){if(typeof a=="number")return a
throw A.b(A.m(a,"num"))},
dJ(a){if(typeof a=="number")return a
if(a==null)return a
throw A.b(A.m(a,"num"))},
cJ(a){if(typeof a=="number")return a
if(a==null)return a
throw A.b(A.m(a,"num?"))},
d0(a){return typeof a=="string"},
bE(a){if(typeof a=="string")return a
throw A.b(A.m(a,"String"))},
dK(a){if(typeof a=="string")return a
if(a==null)return a
throw A.b(A.m(a,"String"))},
cL(a){if(typeof a=="string")return a
if(a==null)return a
throw A.b(A.m(a,"String?"))},
bM(a,b){var t,s,r
for(t="",s="",r=0;r<a.length;++r,s=", ")t+=s+A.n(a[r],b)
return t},
d3(a,b){var t,s,r,q,p,o,n=a.x,m=a.y
if(""===n)return"("+A.bM(m,b)+")"
t=m.length
s=n.split(",")
r=s.length-t
for(q="(",p="",o=0;o<t;++o,p=", "){q+=p
if(r===0)q+="{"
q+=A.n(m[o],b)
if(r>=0)q+=" "+s[r];++r}return q+"})"},
bH(a3,a4,a5){var t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=", ",a2=null
if(a5!=null){t=a5.length
if(a4==null)a4=A.bN([],u.s)
else a2=a4.length
s=a4.length
for(r=t;r>0;--r)B.d.A(a4,"T"+(s+r))
for(q=u.X,p=u._,o="<",n="",r=0;r<t;++r,n=a1){m=a4.length
l=m-1-r
if(!(l>=0))return A.ba(a4,l)
o=o+n+a4[l]
k=a5[r]
j=k.w
if(!(j===2||j===3||j===4||j===5||k===q))m=k===p
else m=!0
if(!m)o+=" extends "+A.n(k,a4)}o+=">"}else o=""
q=a3.x
i=a3.y
h=i.a
g=h.length
f=i.b
e=f.length
d=i.c
c=d.length
b=A.n(q,a4)
for(a="",a0="",r=0;r<g;++r,a0=a1)a+=a0+A.n(h[r],a4)
if(e>0){a+=a0+"["
for(a0="",r=0;r<e;++r,a0=a1)a+=a0+A.n(f[r],a4)
a+="]"}if(c>0){a+=a0+"{"
for(a0="",r=0;r<c;r+=3,a0=a1){a+=a0
if(d[r+1])a+="required "
a+=A.n(d[r+2],a4)+" "+d[r]}a+="}"}if(a2!=null){a4.toString
a4.length=a2}return o+"("+a+") => "+b},
n(a,b){var t,s,r,q,p,o,n,m=a.w
if(m===5)return"erased"
if(m===2)return"dynamic"
if(m===3)return"void"
if(m===1)return"Never"
if(m===4)return"any"
if(m===6)return A.n(a.x,b)
if(m===7){t=a.x
s=A.n(t,b)
r=t.w
return(r===12||r===13?"("+s+")":s)+"?"}if(m===8)return"FutureOr<"+A.n(a.x,b)+">"
if(m===9){q=A.d7(a.x)
p=a.y
return p.length>0?q+("<"+A.bM(p,b)+">"):q}if(m===11)return A.d3(a,b)
if(m===12)return A.bH(a,b,null)
if(m===13)return A.bH(a.x,b,a.y)
if(m===14){o=a.x
n=b.length
o=n-1-o
if(!(o>=0&&o<n))return A.ba(b,o)
return b[o]}return"?"},
d7(a){var t=v.mangledGlobalNames[a]
if(t!=null)return t
return"minified:"+a},
cI(a,b){var t=a.tR[b]
for(;typeof t=="string";)t=a.tR[t]
return t},
cH(a,b){var t,s,r,q,p,o=a.eT,n=o[b]
if(n==null)return A.as(a,b,!1)
else if(typeof n=="number"){t=n
s=A.a_(a,5,"#")
r=A.aS(t)
for(q=0;q<t;++q)r[q]=s
p=A.Z(a,b,r)
o[b]=p
return p}else return n},
cF(a,b){return A.bB(a.tR,b)},
cE(a,b){return A.bB(a.eT,b)},
as(a,b,c){var t,s=a.eC,r=s.get(b)
if(r!=null)return r
t=A.bv(A.bt(a,null,b,c))
s.set(b,t)
return t},
aR(a,b,c){var t,s,r=b.z
if(r==null)r=b.z=new Map()
t=r.get(c)
if(t!=null)return t
s=A.bv(A.bt(a,b,c,!0))
r.set(c,s)
return s},
cG(a,b,c){var t,s,r,q=b.Q
if(q==null)q=b.Q=new Map()
t=c.as
s=q.get(t)
if(s!=null)return s
r=A.b1(a,b,c.w===10?c.y:[c])
q.set(t,r)
return r},
t(a,b){b.a=A.cS
b.b=A.cT
return b},
a_(a,b,c){var t,s,r=a.eC.get(c)
if(r!=null)return r
t=new A.q(null,null)
t.w=b
t.as=c
s=A.t(a,t)
a.eC.set(c,s)
return s},
bA(a,b,c){var t,s=b.as+"*",r=a.eC.get(s)
if(r!=null)return r
t=A.cC(a,b,s,c)
a.eC.set(s,t)
return t},
cC(a,b,c,d){var t,s,r
if(d){t=b.w
if(!A.v(b))s=b===u.P||b===u.T||t===7||t===6
else s=!0
if(s)return b}r=new A.q(null,null)
r.w=6
r.x=b
r.as=c
return A.t(a,r)},
b3(a,b,c){var t,s=b.as+"?",r=a.eC.get(s)
if(r!=null)return r
t=A.cB(a,b,s,c)
a.eC.set(s,t)
return t},
cB(a,b,c,d){var t,s,r,q
if(d){t=b.w
s=!0
if(!A.v(b))if(!(b===u.P||b===u.T))if(t!==7)s=t===8&&A.a2(b.x)
if(s)return b
else if(t===1||b===u.A)return u.P
else if(t===6){r=b.x
if(r.w===8&&A.a2(r.x))return r
else return A.bo(a,b)}}q=new A.q(null,null)
q.w=7
q.x=b
q.as=c
return A.t(a,q)},
by(a,b,c){var t,s=b.as+"/",r=a.eC.get(s)
if(r!=null)return r
t=A.cz(a,b,s,c)
a.eC.set(s,t)
return t},
cz(a,b,c,d){var t,s
if(d){t=b.w
if(A.v(b)||b===u.K||b===u._)return b
else if(t===1)return A.Z(a,"bk",[b])
else if(b===u.P||b===u.T)return u.O}s=new A.q(null,null)
s.w=8
s.x=b
s.as=c
return A.t(a,s)},
cD(a,b){var t,s,r=""+b+"^",q=a.eC.get(r)
if(q!=null)return q
t=new A.q(null,null)
t.w=14
t.x=b
t.as=r
s=A.t(a,t)
a.eC.set(r,s)
return s},
Y(a){var t,s,r,q=a.length
for(t="",s="",r=0;r<q;++r,s=",")t+=s+a[r].as
return t},
cy(a){var t,s,r,q,p,o=a.length
for(t="",s="",r=0;r<o;r+=3,s=","){q=a[r]
p=a[r+1]?"!":":"
t+=s+q+p+a[r+2].as}return t},
Z(a,b,c){var t,s,r,q=b
if(c.length>0)q+="<"+A.Y(c)+">"
t=a.eC.get(q)
if(t!=null)return t
s=new A.q(null,null)
s.w=9
s.x=b
s.y=c
if(c.length>0)s.c=c[0]
s.as=q
r=A.t(a,s)
a.eC.set(q,r)
return r},
b1(a,b,c){var t,s,r,q,p,o
if(b.w===10){t=b.x
s=b.y.concat(c)}else{s=c
t=b}r=t.as+(";<"+A.Y(s)+">")
q=a.eC.get(r)
if(q!=null)return q
p=new A.q(null,null)
p.w=10
p.x=t
p.y=s
p.as=r
o=A.t(a,p)
a.eC.set(r,o)
return o},
bz(a,b,c){var t,s,r="+"+(b+"("+A.Y(c)+")"),q=a.eC.get(r)
if(q!=null)return q
t=new A.q(null,null)
t.w=11
t.x=b
t.y=c
t.as=r
s=A.t(a,t)
a.eC.set(r,s)
return s},
bx(a,b,c){var t,s,r,q,p,o=b.as,n=c.a,m=n.length,l=c.b,k=l.length,j=c.c,i=j.length,h="("+A.Y(n)
if(k>0){t=m>0?",":""
h+=t+"["+A.Y(l)+"]"}if(i>0){t=m>0?",":""
h+=t+"{"+A.cy(j)+"}"}s=o+(h+")")
r=a.eC.get(s)
if(r!=null)return r
q=new A.q(null,null)
q.w=12
q.x=b
q.y=c
q.as=s
p=A.t(a,q)
a.eC.set(s,p)
return p},
b2(a,b,c,d){var t,s=b.as+("<"+A.Y(c)+">"),r=a.eC.get(s)
if(r!=null)return r
t=A.cA(a,b,c,s,d)
a.eC.set(s,t)
return t},
cA(a,b,c,d,e){var t,s,r,q,p,o,n,m
if(e){t=c.length
s=A.aS(t)
for(r=0,q=0;q<t;++q){p=c[q]
if(p.w===1){s[q]=p;++r}}if(r>0){o=A.z(a,b,s,0)
n=A.F(a,c,s,0)
return A.b2(a,o,n,c!==n)}}m=new A.q(null,null)
m.w=13
m.x=b
m.y=c
m.as=d
return A.t(a,m)},
bt(a,b,c,d){return{u:a,e:b,r:c,s:[],p:0,n:d}},
bv(a){var t,s,r,q,p,o,n,m=a.r,l=a.s
for(t=m.length,s=0;s<t;){r=m.charCodeAt(s)
if(r>=48&&r<=57)s=A.cs(s+1,r,m,l)
else if((((r|32)>>>0)-97&65535)<26||r===95||r===36||r===124)s=A.bu(a,s,m,l,!1)
else if(r===46)s=A.bu(a,s,m,l,!0)
else{++s
switch(r){case 44:break
case 58:l.push(!1)
break
case 33:l.push(!0)
break
case 59:l.push(A.y(a.u,a.e,l.pop()))
break
case 94:l.push(A.cD(a.u,l.pop()))
break
case 35:l.push(A.a_(a.u,5,"#"))
break
case 64:l.push(A.a_(a.u,2,"@"))
break
case 126:l.push(A.a_(a.u,3,"~"))
break
case 60:l.push(a.p)
a.p=l.length
break
case 62:A.cu(a,l)
break
case 38:A.ct(a,l)
break
case 42:q=a.u
l.push(A.bA(q,A.y(q,a.e,l.pop()),a.n))
break
case 63:q=a.u
l.push(A.b3(q,A.y(q,a.e,l.pop()),a.n))
break
case 47:q=a.u
l.push(A.by(q,A.y(q,a.e,l.pop()),a.n))
break
case 40:l.push(-3)
l.push(a.p)
a.p=l.length
break
case 41:A.cr(a,l)
break
case 91:l.push(a.p)
a.p=l.length
break
case 93:p=l.splice(a.p)
A.bw(a.u,a.e,p)
a.p=l.pop()
l.push(p)
l.push(-1)
break
case 123:l.push(a.p)
a.p=l.length
break
case 125:p=l.splice(a.p)
A.cw(a.u,a.e,p)
a.p=l.pop()
l.push(p)
l.push(-2)
break
case 43:o=m.indexOf("(",s)
l.push(m.substring(s,o))
l.push(-4)
l.push(a.p)
a.p=l.length
s=o+1
break
default:throw"Bad character "+r}}}n=l.pop()
return A.y(a.u,a.e,n)},
cs(a,b,c,d){var t,s,r=b-48
for(t=c.length;a<t;++a){s=c.charCodeAt(a)
if(!(s>=48&&s<=57))break
r=r*10+(s-48)}d.push(r)
return a},
bu(a,b,c,d,e){var t,s,r,q,p,o,n=b+1
for(t=c.length;n<t;++n){s=c.charCodeAt(n)
if(s===46){if(e)break
e=!0}else{if(!((((s|32)>>>0)-97&65535)<26||s===95||s===36||s===124))r=s>=48&&s<=57
else r=!0
if(!r)break}}q=c.substring(b,n)
if(e){t=a.u
p=a.e
if(p.w===10)p=p.x
o=A.cI(t,p.x)[q]
if(o==null)A.dq('No "'+q+'" in "'+A.cl(p)+'"')
d.push(A.aR(t,p,o))}else d.push(q)
return n},
cu(a,b){var t,s=a.u,r=A.bs(a,b),q=b.pop()
if(typeof q=="string")b.push(A.Z(s,q,r))
else{t=A.y(s,a.e,q)
switch(t.w){case 12:b.push(A.b2(s,t,r,a.n))
break
default:b.push(A.b1(s,t,r))
break}}},
cr(a,b){var t,s,r,q=a.u,p=b.pop(),o=null,n=null
if(typeof p=="number")switch(p){case-1:o=b.pop()
break
case-2:n=b.pop()
break
default:b.push(p)
break}else b.push(p)
t=A.bs(a,b)
p=b.pop()
switch(p){case-3:p=b.pop()
if(o==null)o=q.sEA
if(n==null)n=q.sEA
s=A.y(q,a.e,p)
r=new A.aq()
r.a=t
r.b=o
r.c=n
b.push(A.bx(q,s,r))
return
case-4:b.push(A.bz(q,b.pop(),t))
return
default:throw A.b(A.a6("Unexpected state under `()`: "+A.S(p)))}},
ct(a,b){var t=b.pop()
if(0===t){b.push(A.a_(a.u,1,"0&"))
return}if(1===t){b.push(A.a_(a.u,4,"1&"))
return}throw A.b(A.a6("Unexpected extended operation "+A.S(t)))},
bs(a,b){var t=b.splice(a.p)
A.bw(a.u,a.e,t)
a.p=b.pop()
return t},
y(a,b,c){if(typeof c=="string")return A.Z(a,c,a.sEA)
else if(typeof c=="number"){b.toString
return A.cv(a,b,c)}else return c},
bw(a,b,c){var t,s=c.length
for(t=0;t<s;++t)c[t]=A.y(a,b,c[t])},
cw(a,b,c){var t,s=c.length
for(t=2;t<s;t+=3)c[t]=A.y(a,b,c[t])},
cv(a,b,c){var t,s,r=b.w
if(r===10){if(c===0)return b.x
t=b.y
s=t.length
if(c<=s)return t[c-1]
c-=s
b=b.x
r=b.w}else if(c===0)return b
if(r!==9)throw A.b(A.a6("Indexed base must be an interface type"))
t=b.y
if(c<=t.length)return t[c-1]
throw A.b(A.a6("Bad index "+c+" for "+b.h(0)))},
di(a,b,c){var t,s=b.d
if(s==null)s=b.d=new Map()
t=s.get(c)
if(t==null){t=A.i(a,b,null,c,null,!1)?1:0
s.set(c,t)}if(0===t)return!1
if(1===t)return!0
return!0},
i(a,b,c,d,e,f){var t,s,r,q,p,o,n,m,l,k,j
if(b===d)return!0
if(!A.v(d))t=d===u._
else t=!0
if(t)return!0
s=b.w
if(s===4)return!0
if(A.v(b))return!1
t=b.w
if(t===1)return!0
r=s===14
if(r)if(A.i(a,c[b.x],c,d,e,!1))return!0
q=d.w
t=b===u.P||b===u.T
if(t){if(q===8)return A.i(a,b,c,d.x,e,!1)
return d===u.P||d===u.T||q===7||q===6}if(d===u.K){if(s===8)return A.i(a,b.x,c,d,e,!1)
if(s===6)return A.i(a,b.x,c,d,e,!1)
return s!==7}if(s===6)return A.i(a,b.x,c,d,e,!1)
if(q===6){t=A.bo(a,d)
return A.i(a,b,c,t,e,!1)}if(s===8){if(!A.i(a,b.x,c,d,e,!1))return!1
return A.i(a,A.b0(a,b),c,d,e,!1)}if(s===7){t=A.i(a,u.P,c,d,e,!1)
return t&&A.i(a,b.x,c,d,e,!1)}if(q===8){if(A.i(a,b,c,d.x,e,!1))return!0
return A.i(a,b,c,A.b0(a,d),e,!1)}if(q===7){t=A.i(a,b,c,u.P,e,!1)
return t||A.i(a,b,c,d.x,e,!1)}if(r)return!1
t=s!==12
if((!t||s===13)&&d===u.Z)return!0
p=s===11
if(p&&d===u.L)return!0
if(q===13){if(b===u.g)return!0
if(s!==13)return!1
o=b.y
n=d.y
m=o.length
if(m!==n.length)return!1
c=c==null?o:o.concat(c)
e=e==null?n:n.concat(e)
for(l=0;l<m;++l){k=o[l]
j=n[l]
if(!A.i(a,k,c,j,e,!1)||!A.i(a,j,e,k,c,!1))return!1}return A.bJ(a,b.x,c,d.x,e,!1)}if(q===12){if(b===u.g)return!0
if(t)return!1
return A.bJ(a,b,c,d,e,!1)}if(s===9){if(q!==9)return!1
return A.cW(a,b,c,d,e,!1)}if(p&&q===11)return A.d_(a,b,c,d,e,!1)
return!1},
bJ(a2,a3,a4,a5,a6,a7){var t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1
if(!A.i(a2,a3.x,a4,a5.x,a6,!1))return!1
t=a3.y
s=a5.y
r=t.a
q=s.a
p=r.length
o=q.length
if(p>o)return!1
n=o-p
m=t.b
l=s.b
k=m.length
j=l.length
if(p+k<o+j)return!1
for(i=0;i<p;++i){h=r[i]
if(!A.i(a2,q[i],a6,h,a4,!1))return!1}for(i=0;i<n;++i){h=m[i]
if(!A.i(a2,q[p+i],a6,h,a4,!1))return!1}for(i=0;i<j;++i){h=m[n+i]
if(!A.i(a2,l[i],a6,h,a4,!1))return!1}g=t.c
f=s.c
e=g.length
d=f.length
for(c=0,b=0;b<d;b+=3){a=f[b]
for(;!0;){if(c>=e)return!1
a0=g[c]
c+=3
if(a<a0)return!1
a1=g[c-2]
if(a0<a){if(a1)return!1
continue}h=f[b+1]
if(a1&&!h)return!1
h=g[c-1]
if(!A.i(a2,f[b+2],a6,h,a4,!1))return!1
break}}for(;c<e;){if(g[c+1])return!1
c+=3}return!0},
cW(a,b,c,d,e,f){var t,s,r,q,p,o=b.x,n=d.x
for(;o!==n;){t=a.tR[o]
if(t==null)return!1
if(typeof t=="string"){o=t
continue}s=t[n]
if(s==null)return!1
r=s.length
q=r>0?new Array(r):v.typeUniverse.sEA
for(p=0;p<r;++p)q[p]=A.aR(a,b,s[p])
return A.bC(a,q,null,c,d.y,e,!1)}return A.bC(a,b.y,null,c,d.y,e,!1)},
bC(a,b,c,d,e,f,g){var t,s=b.length
for(t=0;t<s;++t)if(!A.i(a,b[t],d,e[t],f,!1))return!1
return!0},
d_(a,b,c,d,e,f){var t,s=b.y,r=d.y,q=s.length
if(q!==r.length)return!1
if(b.x!==d.x)return!1
for(t=0;t<q;++t)if(!A.i(a,s[t],c,r[t],e,!1))return!1
return!0},
a2(a){var t=a.w,s=!0
if(!(a===u.P||a===u.T))if(!A.v(a))if(t!==7)if(!(t===6&&A.a2(a.x)))s=t===8&&A.a2(a.x)
return s},
dh(a){var t
if(!A.v(a))t=a===u._
else t=!0
return t},
v(a){var t=a.w
return t===2||t===3||t===4||t===5||a===u.X},
bB(a,b){var t,s,r=Object.keys(b),q=r.length
for(t=0;t<q;++t){s=r[t]
a[s]=b[s]}},
aS(a){return a>0?new Array(a):v.typeUniverse.sEA},
q:function q(a,b){var _=this
_.a=a
_.b=b
_.r=_.f=_.d=_.c=null
_.w=0
_.as=_.Q=_.z=_.y=_.x=null},
aq:function aq(){this.c=this.b=this.a=null},
aQ:function aQ(a){this.a=a},
aO:function aO(){},
ar:function ar(a){this.a=a},
e:function e(){},
cm(a,b,c){var t=J.c_(b)
if(!t.n())return a
if(c.length===0){do a+=A.S(t.gm())
while(t.n())}else{a+=A.S(t.gm())
for(;t.n();)a=a+c+A.S(t.gm())}return a},
c8(a){var t=Math.abs(a),s=a<0?"-":""
if(t>=1000)return""+a
if(t>=100)return s+"0"+t
if(t>=10)return s+"00"+t
return s+"000"+t},
bj(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
a8(a){if(a>=10)return""+a
return"0"+a},
az(a){if(typeof a=="number"||A.b5(a)||a==null)return J.a4(a)
if(typeof a=="string")return JSON.stringify(a)
return A.ck(a)},
a6(a){return new A.au(a)},
bq(a){return new A.aL(a)},
bi(a){return new A.aw(a)},
bl(a,b,c){var t,s
if(A.dj(a))return b+"..."+c
t=new A.aI(b)
B.d.A($.a3,a)
try{s=t
s.a=A.cm(s.a,a,", ")}finally{if(0>=$.a3.length)return A.ba($.a3,-1)
$.a3.pop()}t.a+=c
s=t.a
return s.charCodeAt(0)==0?s:s},
ax:function ax(a,b,c){this.a=a
this.b=b
this.c=c},
ay:function ay(){},
au:function au(a){this.a=a},
aK:function aK(){},
H:function H(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
aE:function aE(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
aA:function aA(a,b,c,d,e){var _=this
_.f=a
_.a=b
_.b=c
_.c=d
_.d=e},
aM:function aM(a){this.a=a},
aL:function aL(a){this.a=a},
aw:function aw(a){this.a=a},
R:function R(){},
k:function k(){},
aI:function aI(a){this.a=a},
dr(a){A.bX(new A.aC("Field '"+a+"' has been assigned during initialization."),new Error())},
dl(){var t=new A.ax(Date.now(),0,!1),s=u.m,r=u.z.a(s.a(self.document).querySelector("#output"))
if(r==null)r=s.a(r)
r.textContent="The time is "+A.bm(t)+":"+A.bn(t)+" and your Dart web app is running!"}},B={}
var w=[A,J,B]
var $={}
A.b_.prototype={}
J.a9.prototype={
h(a){return"Instance of '"+A.aD(a)+"'"},
gi(a){return A.C(A.b4(this))}}
J.aa.prototype={
h(a){return String(a)},
gi(a){return A.C(u.y)},
$ic:1,
$ib6:1}
J.I.prototype={
h(a){return"null"},
$ic:1}
J.L.prototype={$ij:1}
J.x.prototype={
h(a){return String(a)}}
J.ap.prototype={}
J.T.prototype={}
J.w.prototype={
h(a){var t=a[$.bZ()]
if(t==null)return this.C(a)
return"JavaScript function for "+J.a4(t)}}
J.K.prototype={
h(a){return String(a)}}
J.M.prototype={
h(a){return String(a)}}
J.p.prototype={
A(a,b){A.aT(a).c.a(b)
a.$flags&1&&A.ds(a,29)
a.push(b)},
h(a){return A.bl(a,"[","]")},
gB(a){return new J.a5(a,a.length,A.aT(a).l("a5<1>"))},
gj(a){return a.length},
$ih:1,
$id:1}
J.aB.prototype={}
J.a5.prototype={
gm(){var t=this.d
return t==null?this.$ti.c.a(t):t},
n(){var t,s=this,r=s.a,q=r.length
if(s.b!==q){r=A.dp(r)
throw A.b(r)}t=s.c
if(t>=q){s.sv(null)
return!1}s.sv(r[t]);++s.c
return!0},
sv(a){this.d=this.$ti.l("1?").a(a)}}
J.ad.prototype={
h(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gi(a){return A.C(u.H)},
$if:1}
J.ab.prototype={
gi(a){return A.C(u.S)},
$ic:1,
$ia:1}
J.ac.prototype={
gi(a){return A.C(u.i)},
$ic:1}
J.J.prototype={
h(a){return a},
gi(a){return A.C(u.N)},
gj(a){return a.length},
$ic:1,
$iaH:1}
A.aC.prototype={
h(a){return"LateInitializationError: "+this.a}}
A.ae.prototype={
gm(){var t=this.d
return t==null?this.$ti.c.a(t):t},
n(){var t,s=this,r=s.a,q=J.bS(r),p=q.gj(r)
if(s.b!==p)throw A.b(A.bi(r))
t=s.c
if(t>=p){s.su(null)
return!1}s.su(q.k(r,t));++s.c
return!0},
su(a){this.d=this.$ti.l("1?").a(a)}}
A.l.prototype={}
A.A.prototype={
h(a){var t=this.constructor,s=t==null?null:t.name
return"Closure '"+A.bY(s==null?"unknown":s)+"'"},
gD(){return this},
$C:"$1",
$R:1,
$D:null}
A.av.prototype={$C:"$2",$R:2}
A.aJ.prototype={}
A.aG.prototype={
h(a){var t=this.$static_name
if(t==null)return"Closure of unknown static method"
return"Closure '"+A.bY(t)+"'"}}
A.a7.prototype={
h(a){return"Closure '"+this.$_name+"' of "+("Instance of '"+A.aD(this.a)+"'")}}
A.aN.prototype={
h(a){return"Reading static variable '"+this.a+"' during its initialization"}}
A.aF.prototype={
h(a){return"RuntimeError: "+this.a}}
A.aV.prototype={
$1(a){return this.a(a)}}
A.aW.prototype={
$2(a,b){return this.a(a,b)}}
A.aX.prototype={
$1(a){return this.a(A.bE(a))}}
A.af.prototype={
gi(a){return B.p},
$ic:1}
A.P.prototype={}
A.ag.prototype={
gi(a){return B.q},
$ic:1}
A.D.prototype={
gj(a){return a.length},
$io:1}
A.N.prototype={
k(a,b){A.B(b,a,a.length)
return a[b]},
$ih:1,
$id:1}
A.O.prototype={$ih:1,$id:1}
A.ah.prototype={
gi(a){return B.r},
$ic:1}
A.ai.prototype={
gi(a){return B.t},
$ic:1}
A.aj.prototype={
gi(a){return B.u},
k(a,b){A.B(b,a,a.length)
return a[b]},
$ic:1}
A.ak.prototype={
gi(a){return B.v},
k(a,b){A.B(b,a,a.length)
return a[b]},
$ic:1}
A.al.prototype={
gi(a){return B.w},
k(a,b){A.B(b,a,a.length)
return a[b]},
$ic:1}
A.am.prototype={
gi(a){return B.x},
k(a,b){A.B(b,a,a.length)
return a[b]},
$ic:1}
A.an.prototype={
gi(a){return B.y},
k(a,b){A.B(b,a,a.length)
return a[b]},
$ic:1}
A.Q.prototype={
gi(a){return B.z},
gj(a){return a.length},
k(a,b){A.B(b,a,a.length)
return a[b]},
$ic:1}
A.ao.prototype={
gi(a){return B.A},
gj(a){return a.length},
k(a,b){A.B(b,a,a.length)
return a[b]},
$ic:1}
A.U.prototype={}
A.V.prototype={}
A.W.prototype={}
A.X.prototype={}
A.q.prototype={
l(a){return A.aR(v.typeUniverse,this,a)},
E(a){return A.cG(v.typeUniverse,this,a)}}
A.aq.prototype={}
A.aQ.prototype={
h(a){return A.n(this.a,null)}}
A.aO.prototype={
h(a){return this.a}}
A.ar.prototype={}
A.e.prototype={
gB(a){return new A.ae(a,this.gj(a),A.a1(a).l("ae<e.E>"))},
h(a){return A.bl(a,"[","]")}}
A.ax.prototype={
h(a){var t=this,s=A.c8(A.cj(t)),r=A.a8(A.ch(t)),q=A.a8(A.cf(t)),p=A.a8(A.bm(t)),o=A.a8(A.bn(t)),n=A.a8(A.ci(t)),m=A.bj(A.cg(t)),l=t.b,k=l===0?"":A.bj(l)
return s+"-"+r+"-"+q+" "+p+":"+o+":"+n+"."+m+k}}
A.ay.prototype={}
A.au.prototype={
h(a){var t=this.a
if(t!=null)return"Assertion failed: "+A.az(t)
return"Assertion failed"}}
A.aK.prototype={}
A.H.prototype={
gq(){return"Invalid argument"+(!this.a?"(s)":"")},
gp(){return""},
h(a){var t=this,s=t.c,r=s==null?"":" ("+s+")",q=t.d,p=q==null?"":": "+q,o=t.gq()+r+p
if(!t.a)return o
return o+t.gp()+": "+A.az(t.gt())},
gt(){return this.b}}
A.aE.prototype={
gt(){return A.cJ(this.b)},
gq(){return"RangeError"},
gp(){return""}}
A.aA.prototype={
gt(){return A.bD(this.b)},
gq(){return"RangeError"},
gp(){if(A.bD(this.b)<0)return": index must not be negative"
var t=this.f
if(t===0)return": no indices are valid"
return": index should be less than "+t},
gj(a){return this.f}}
A.aM.prototype={
h(a){return"Unsupported operation: "+this.a}}
A.aL.prototype={
h(a){return"UnimplementedError: "+this.a}}
A.aw.prototype={
h(a){return"Concurrent modification during iteration: "+A.az(this.a)+"."}}
A.R.prototype={
h(a){return"null"}}
A.k.prototype={$ik:1,
h(a){return"Instance of '"+A.aD(this)+"'"},
gi(a){return A.db(this)},
toString(){return this.h(this)}}
A.aI.prototype={
gj(a){return this.a.length},
h(a){var t=this.a
return t.charCodeAt(0)==0?t:t}};(function aliases(){var t=J.x.prototype
t.C=t.h})();(function inheritance(){var t=hunkHelpers.mixin,s=hunkHelpers.inherit,r=hunkHelpers.inheritMany
s(A.k,null)
r(A.k,[A.b_,J.a9,J.a5,A.ay,A.ae,A.l,A.A,A.q,A.aq,A.aQ,A.e,A.ax,A.R,A.aI])
r(J.a9,[J.aa,J.I,J.L,J.K,J.M,J.ad,J.J])
r(J.L,[J.x,J.p,A.af,A.P])
r(J.x,[J.ap,J.T,J.w])
s(J.aB,J.p)
r(J.ad,[J.ab,J.ac])
r(A.ay,[A.aC,A.aN,A.aF,A.aO,A.au,A.aK,A.H,A.aM,A.aL,A.aw])
r(A.A,[A.av,A.aJ,A.aV,A.aX])
r(A.aJ,[A.aG,A.a7])
s(A.aW,A.av)
r(A.P,[A.ag,A.D])
r(A.D,[A.U,A.W])
s(A.V,A.U)
s(A.N,A.V)
s(A.X,A.W)
s(A.O,A.X)
r(A.N,[A.ah,A.ai])
r(A.O,[A.aj,A.ak,A.al,A.am,A.an,A.Q,A.ao])
s(A.ar,A.aO)
r(A.H,[A.aE,A.aA])
t(A.U,A.e)
t(A.V,A.l)
t(A.W,A.e)
t(A.X,A.l)})()
var v={typeUniverse:{eC:new Map(),tR:{},eT:{},tPV:{},sEA:[]},mangledGlobalNames:{a:"int",f:"double",dn:"num",aH:"String",b6:"bool",R:"Null",d:"List",k:"Object",dy:"Map"},mangledNames:{},types:[],interceptorsByTag:null,leafTags:null,arrayRti:Symbol("$ti")}
A.cF(v.typeUniverse,JSON.parse('{"ap":"x","T":"x","w":"x","aa":{"b6":[],"c":[]},"I":{"c":[]},"L":{"j":[]},"x":{"j":[]},"p":{"d":["1"],"j":[],"h":["1"]},"aB":{"p":["1"],"d":["1"],"j":[],"h":["1"]},"ad":{"f":[]},"ab":{"f":[],"a":[],"c":[]},"ac":{"f":[],"c":[]},"J":{"aH":[],"c":[]},"af":{"j":[],"c":[]},"P":{"j":[]},"ag":{"j":[],"c":[]},"D":{"o":["1"],"j":[]},"N":{"e":["f"],"d":["f"],"o":["f"],"j":[],"h":["f"],"l":["f"]},"O":{"e":["a"],"d":["a"],"o":["a"],"j":[],"h":["a"],"l":["a"]},"ah":{"e":["f"],"d":["f"],"o":["f"],"j":[],"h":["f"],"l":["f"],"c":[],"e.E":"f"},"ai":{"e":["f"],"d":["f"],"o":["f"],"j":[],"h":["f"],"l":["f"],"c":[],"e.E":"f"},"aj":{"e":["a"],"d":["a"],"o":["a"],"j":[],"h":["a"],"l":["a"],"c":[],"e.E":"a"},"ak":{"e":["a"],"d":["a"],"o":["a"],"j":[],"h":["a"],"l":["a"],"c":[],"e.E":"a"},"al":{"e":["a"],"d":["a"],"o":["a"],"j":[],"h":["a"],"l":["a"],"c":[],"e.E":"a"},"am":{"e":["a"],"d":["a"],"o":["a"],"j":[],"h":["a"],"l":["a"],"c":[],"e.E":"a"},"an":{"e":["a"],"d":["a"],"o":["a"],"j":[],"h":["a"],"l":["a"],"c":[],"e.E":"a"},"Q":{"e":["a"],"d":["a"],"o":["a"],"j":[],"h":["a"],"l":["a"],"c":[],"e.E":"a"},"ao":{"e":["a"],"d":["a"],"o":["a"],"j":[],"h":["a"],"l":["a"],"c":[],"e.E":"a"},"cd":{"d":["a"],"h":["a"]},"cq":{"d":["a"],"h":["a"]},"cp":{"d":["a"],"h":["a"]},"cb":{"d":["a"],"h":["a"]},"cn":{"d":["a"],"h":["a"]},"cc":{"d":["a"],"h":["a"]},"co":{"d":["a"],"h":["a"]},"c9":{"d":["f"],"h":["f"]},"ca":{"d":["f"],"h":["f"]}}'))
A.cE(v.typeUniverse,JSON.parse('{"D":1}'))
var u=(function rtii(){var t=A.bR
return{Z:t("dx"),s:t("p<aH>"),b:t("p<@>"),T:t("I"),m:t("j"),g:t("w"),p:t("o<@>"),j:t("d<@>"),P:t("R"),K:t("k"),L:t("dz"),N:t("aH"),R:t("c"),o:t("T"),y:t("b6"),i:t("f"),S:t("a"),A:t("0&*"),_:t("k*"),O:t("bk<R>?"),z:t("j?"),X:t("k?"),H:t("dn")}})();(function constants(){B.m=J.a9.prototype
B.d=J.p.prototype
B.n=J.w.prototype
B.o=J.L.prototype
B.e=J.ap.prototype
B.a=J.T.prototype
B.b=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
B.f=function() {
  var toStringFunction = Object.prototype.toString;
  function getTag(o) {
    var s = toStringFunction.call(o);
    return s.substring(8, s.length - 1);
  }
  function getUnknownTag(object, tag) {
    if (/^HTML[A-Z].*Element$/.test(tag)) {
      var name = toStringFunction.call(object);
      if (name == "[object Object]") return null;
      return "HTMLElement";
    }
  }
  function getUnknownTagGenericBrowser(object, tag) {
    if (object instanceof HTMLElement) return "HTMLElement";
    return getUnknownTag(object, tag);
  }
  function prototypeForTag(tag) {
    if (typeof window == "undefined") return null;
    if (typeof window[tag] == "undefined") return null;
    var constructor = window[tag];
    if (typeof constructor != "function") return null;
    return constructor.prototype;
  }
  function discriminator(tag) { return null; }
  var isBrowser = typeof HTMLElement == "function";
  return {
    getTag: getTag,
    getUnknownTag: isBrowser ? getUnknownTagGenericBrowser : getUnknownTag,
    prototypeForTag: prototypeForTag,
    discriminator: discriminator };
}
B.l=function(getTagFallback) {
  return function(hooks) {
    if (typeof navigator != "object") return hooks;
    var userAgent = navigator.userAgent;
    if (typeof userAgent != "string") return hooks;
    if (userAgent.indexOf("DumpRenderTree") >= 0) return hooks;
    if (userAgent.indexOf("Chrome") >= 0) {
      function confirm(p) {
        return typeof window == "object" && window[p] && window[p].name == p;
      }
      if (confirm("Window") && confirm("HTMLElement")) return hooks;
    }
    hooks.getTag = getTagFallback;
  };
}
B.h=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
B.k=function(hooks) {
  if (typeof navigator != "object") return hooks;
  var userAgent = navigator.userAgent;
  if (typeof userAgent != "string") return hooks;
  if (userAgent.indexOf("Firefox") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "GeoGeolocation": "Geolocation",
    "Location": "!Location",
    "WorkerMessageEvent": "MessageEvent",
    "XMLDocument": "!Document"};
  function getTagFirefox(o) {
    var tag = getTag(o);
    return quickMap[tag] || tag;
  }
  hooks.getTag = getTagFirefox;
}
B.j=function(hooks) {
  if (typeof navigator != "object") return hooks;
  var userAgent = navigator.userAgent;
  if (typeof userAgent != "string") return hooks;
  if (userAgent.indexOf("Trident/") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "HTMLDDElement": "HTMLElement",
    "HTMLDTElement": "HTMLElement",
    "HTMLPhraseElement": "HTMLElement",
    "Position": "Geoposition"
  };
  function getTagIE(o) {
    var tag = getTag(o);
    var newTag = quickMap[tag];
    if (newTag) return newTag;
    if (tag == "Object") {
      if (window.DataView && (o instanceof window.DataView)) return "DataView";
    }
    return tag;
  }
  function prototypeForTagIE(tag) {
    var constructor = window[tag];
    if (constructor == null) return null;
    return constructor.prototype;
  }
  hooks.getTag = getTagIE;
  hooks.prototypeForTag = prototypeForTagIE;
}
B.i=function(hooks) {
  var getTag = hooks.getTag;
  var prototypeForTag = hooks.prototypeForTag;
  function getTagFixed(o) {
    var tag = getTag(o);
    if (tag == "Document") {
      if (!!o.xmlVersion) return "!Document";
      return "!HTMLDocument";
    }
    return tag;
  }
  function prototypeForTagFixed(tag) {
    if (tag == "Document") return null;
    return prototypeForTag(tag);
  }
  hooks.getTag = getTagFixed;
  hooks.prototypeForTag = prototypeForTagFixed;
}
B.c=function(hooks) { return hooks; }

B.p=A.r("du")
B.q=A.r("dv")
B.r=A.r("c9")
B.t=A.r("ca")
B.u=A.r("cb")
B.v=A.r("cc")
B.w=A.r("cd")
B.x=A.r("cn")
B.y=A.r("co")
B.z=A.r("cp")
B.A=A.r("cq")})();(function staticFields(){$.aP=null
$.a3=A.bN([],A.bR("p<k>"))
$.bf=null
$.be=null
$.bT=null
$.bO=null
$.bW=null
$.aU=null
$.aY=null
$.b9=null})();(function lazyInitializers(){var t=hunkHelpers.lazyFinal
t($,"dw","bZ",()=>A.da("_$dart_dartClosure"))})();(function nativeSupport(){!function(){var t=function(a){var n={}
n[a]=1
return Object.keys(hunkHelpers.convertToFastObject(n))[0]}
v.getIsolateTag=function(a){return t("___dart_"+a+v.isolateTag)}
var s="___dart_isolate_tags_"
var r=Object[s]||(Object[s]=Object.create(null))
var q="_ZxYxX"
for(var p=0;;p++){var o=t(q+"_"+p+"_")
if(!(o in r)){r[o]=1
v.isolateTag=o
break}}v.dispatchPropertyName=v.getIsolateTag("dispatch_record")}()
hunkHelpers.setOrUpdateInterceptorsByTag({ArrayBuffer:A.af,ArrayBufferView:A.P,DataView:A.ag,Float32Array:A.ah,Float64Array:A.ai,Int16Array:A.aj,Int32Array:A.ak,Int8Array:A.al,Uint16Array:A.am,Uint32Array:A.an,Uint8ClampedArray:A.Q,CanvasPixelArray:A.Q,Uint8Array:A.ao})
hunkHelpers.setOrUpdateLeafTags({ArrayBuffer:true,ArrayBufferView:false,DataView:true,Float32Array:true,Float64Array:true,Int16Array:true,Int32Array:true,Int8Array:true,Uint16Array:true,Uint32Array:true,Uint8ClampedArray:true,CanvasPixelArray:true,Uint8Array:false})
A.D.$nativeSuperclassTag="ArrayBufferView"
A.U.$nativeSuperclassTag="ArrayBufferView"
A.V.$nativeSuperclassTag="ArrayBufferView"
A.N.$nativeSuperclassTag="ArrayBufferView"
A.W.$nativeSuperclassTag="ArrayBufferView"
A.X.$nativeSuperclassTag="ArrayBufferView"
A.O.$nativeSuperclassTag="ArrayBufferView"})()
Function.prototype.$0=function(){return this()}
Function.prototype.$1=function(a){return this(a)}
Function.prototype.$2=function(a,b){return this(a,b)}
convertAllToFastObject(w)
convertToFastObject($);(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!="undefined"){a(document.currentScript)
return}var t=document.scripts
function onLoad(b){for(var r=0;r<t.length;++r){t[r].removeEventListener("load",onLoad,false)}a(b.target)}for(var s=0;s<t.length;++s){t[s].addEventListener("load",onLoad,false)}})(function(a){v.currentScript=a
var t=A.dl
if(typeof dartMainRunner==="function"){dartMainRunner(t,[])}else{t([])}})})()
//# sourceMappingURL=main.dart.js.map
