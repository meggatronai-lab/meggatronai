"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

import {
  Copy,
  RefreshCcw,
  ShieldCheck,
  Lock,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

import ToolLinks from "@/components/ui/ToolLinks";


export default function PasswordTool() {

  const [password, setPassword] = useState("");

  const [length, setLength] = useState(16);

  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);

  const [copied, setCopied] = useState(false);

  const [history, setHistory] = useState<string[]>([]);


  const generatePassword = () => {

    let characters = "";

    if (lowercase)
      characters += "abcdefghijklmnopqrstuvwxyz";

    if (uppercase)
      characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (numbers)
      characters += "0123456789";

    if (symbols)
      characters += "!@#$%^&*()_+-={}[]<>?";


    if (!characters) {
      setPassword("");
      return;
    }


    let generated = "";


    for (let i = 0; i < length; i++) {

      const random =
        Math.floor(
          Math.random() * characters.length
        );

      generated += characters[random];

    }


    setPassword(generated);


    setHistory((prev)=>{

      const updated = [
        generated,
        ...prev,
      ];

      return updated.slice(0,5);

    });


  };



  const copyPassword = async()=>{

    if(!password) return;


    await navigator.clipboard.writeText(password);


    setCopied(true);


    setTimeout(()=>{
      setCopied(false);
    },2000);

  };



  const resetTool = ()=>{

    setPassword("");

    setLength(16);

    setUppercase(true);
    setLowercase(true);
    setNumbers(true);
    setSymbols(true);

    setHistory([]);

    setCopied(false);

  };



  const strength = useMemo(()=>{

    let score = 0;


    if(length >= 12)
      score++;


    if(uppercase)
      score++;


    if(lowercase)
      score++;


    if(numbers)
      score++;


    if(symbols)
      score++;



    if(score <=2)
      return {
        label:"Weak",
        width:"25%",
      };


    if(score ===3)
      return {
        label:"Medium",
        width:"50%",
      };


    if(score ===4)
      return {
        label:"Strong",
        width:"75%",
      };


    return {
      label:"Very Strong",
      width:"100%",
    };


  },[
    length,
    uppercase,
    lowercase,
    numbers,
    symbols
  ]);



  const characterCount = useMemo(()=>{

    let count = 0;


    if(lowercase)
      count += 26;

    if(uppercase)
      count += 26;

    if(numbers)
      count += 10;

    if(symbols)
      count += 20;


    return count;

  },[
    uppercase,
    lowercase,
    numbers,
    symbols
  ]);



return (

<main className="min-h-screen bg-[#070b16] py-16">


<div className="mx-auto max-w-6xl px-6">


{/* HERO */}

<motion.section

initial={{
opacity:0,
y:20
}}

animate={{
opacity:1,
y:0
}}

transition={{
duration:.5
}}

className="mx-auto max-w-3xl text-center"

>


<span className="
inline-flex
items-center
gap-2
rounded-full
border
border-cyan-500/20
bg-cyan-500/10
px-4
py-2
text-sm
font-medium
text-cyan-300
">

<ShieldCheck size={16}/>

Free • Secure • Browser Based

</span>



<h1 className="
mt-6
text-4xl
font-extrabold
tracking-tight
text-white
md:text-6xl
">

Password Generator

</h1>



<p className="
mx-auto
mt-5
max-w-2xl
text-lg
leading-8
text-zinc-400
">

Create strong and secure random passwords instantly.
Your passwords are generated locally inside your browser
and never stored.

</p>


</motion.section>





{/* PASSWORD BOX */}


<motion.section

initial={{
opacity:0,
y:20
}}

whileInView={{
opacity:1,
y:0
}}

viewport={{
once:true
}}

className="
mt-14
rounded-3xl
border
border-white/10
bg-[#111827]
p-6
md:p-8
"

>



<div className="
flex
items-center
gap-3
">

<div className="
rounded-xl
bg-cyan-500/10
p-3
">

<Lock
className="text-cyan-400"
/>

</div>


<h2 className="
text-2xl
font-bold
text-white
">

Your Secure Password

</h2>


</div>





<div className="
mt-8
flex
flex-col
gap-4
rounded-2xl
bg-[#070b16]
p-5
md:flex-row
md:items-center
md:justify-between
">


<p className="
break-all
text-xl
font-semibold
tracking-wider
text-white
">

{
password || "Click generate to create password"
}

</p>



<button

onClick={copyPassword}

disabled={!password}

className="
flex
items-center
justify-center
gap-2
rounded-xl
bg-cyan-500
px-5
py-3
font-semibold
text-black
transition
hover:bg-cyan-400
disabled:opacity-40
"

>

{
copied ? (

<>
<CheckCircle2 size={18}/>
Copied
</>

):(

<>
<Copy size={18}/>
Copy
</>

)

}


</button>



</div>





<div className="
mt-6
flex
flex-wrap
gap-3
">


<div className="
flex
items-center
gap-2
rounded-full
bg-cyan-500/10
px-4
py-2
text-sm
text-cyan-300
">

<Sparkles size={15}/>

{strength.label}

</div>



<div className="
rounded-full
bg-white/5
px-4
py-2
text-sm
text-zinc-400
">

Characters Pool: {characterCount}

</div>


</div>


</motion.section>


{/* PASSWORD CONTROLS */}


<motion.section

initial={{
opacity:0,
y:20
}}

whileInView={{
opacity:1,
y:0
}}

viewport={{
once:true
}}

className="
mt-10
rounded-3xl
border
border-white/10
bg-[#111827]
p-6
md:p-8
"

>


<div className="
flex
items-center
justify-between
">

<h2 className="
text-2xl
font-bold
text-white
">

Customize Password

</h2>


<span className="
rounded-full
bg-cyan-500/10
px-4
py-1
text-cyan-300
">

{length} Characters

</span>


</div>





{/* LENGTH SLIDER */}


<div className="mt-8">


<div className="
mb-4
flex
justify-between
text-sm
text-zinc-400
">

<span>
Password Length
</span>


<span>
{length}
</span>


</div>


<input

type="range"

min="4"

max="64"

value={length}

onChange={(e)=>
setLength(
Number(e.target.value)
)
}

className="
w-full
accent-cyan-400
"

/>


</div>





{/* OPTIONS */}


<div className="
mt-10
grid
gap-4
sm:grid-cols-2
"


>


<label className="
flex
cursor-pointer
items-center
justify-between
rounded-2xl
bg-[#070b16]
p-5
transition
hover:bg-white/5
">


<div>

<p className="
font-semibold
text-white
">

Uppercase Letters

</p>


<p className="
text-sm
text-zinc-500
">

A-Z

</p>


</div>


<input

type="checkbox"

checked={uppercase}

onChange={(e)=>
setUppercase(
e.target.checked
)
}

className="
h-5
w-5
accent-cyan-400
"

/>


</label>





<label className="
flex
cursor-pointer
items-center
justify-between
rounded-2xl
bg-[#070b16]
p-5
transition
hover:bg-white/5
">


<div>

<p className="
font-semibold
text-white
">

Lowercase Letters

</p>


<p className="
text-sm
text-zinc-500
">

a-z

</p>


</div>


<input

type="checkbox"

checked={lowercase}

onChange={(e)=>
setLowercase(
e.target.checked
)
}

className="
h-5
w-5
accent-cyan-400
"

/>


</label>





<label className="
flex
cursor-pointer
items-center
justify-between
rounded-2xl
bg-[#070b16]
p-5
transition
hover:bg-white/5
">


<div>

<p className="
font-semibold
text-white
">

Numbers

</p>


<p className="
text-sm
text-zinc-500
">

0-9

</p>


</div>


<input

type="checkbox"

checked={numbers}

onChange={(e)=>
setNumbers(
e.target.checked
)
}

className="
h-5
w-5
accent-cyan-400
"

/>


</label>





<label className="
flex
cursor-pointer
items-center
justify-between
rounded-2xl
bg-[#070b16]
p-5
transition
hover:bg-white/5
">


<div>

<p className="
font-semibold
text-white
">

Symbols

</p>


<p className="
text-sm
text-zinc-500
">

! @ # $

</p>


</div>


<input

type="checkbox"

checked={symbols}

onChange={(e)=>
setSymbols(
e.target.checked
)
}

className="
h-5
w-5
accent-cyan-400
"

/>


</label>



</div>






{/* ACTION BUTTONS */}


<div className="
mt-10
flex
flex-wrap
gap-4
">


<button

onClick={generatePassword}

className="
flex
items-center
gap-2
rounded-xl
bg-cyan-500
px-6
py-3
font-semibold
text-black
transition
hover:bg-cyan-400
"

>


<RefreshCcw size={18}/>

Generate Password


</button>




<button

onClick={resetTool}

className="
flex
items-center
gap-2
rounded-xl
border
border-white/10
px-6
py-3
font-semibold
text-white
transition
hover:border-cyan-400
hover:text-cyan-300
"

>


<RefreshCcw size={18}/>

Reset


</button>



</div>



</motion.section>









{/* PASSWORD STRENGTH */}



<motion.section

initial={{
opacity:0,
y:20
}}

whileInView={{
opacity:1,
y:0
}}

viewport={{
once:true
}}

className="
mt-10
rounded-3xl
border
border-white/10
bg-[#111827]
p-6
md:p-8
"


>


<h2 className="
text-2xl
font-bold
text-white
">

Password Strength

</h2>



<div className="
mt-6
flex
items-center
justify-between
">


<span className="
text-zinc-400
">

Security Level

</span>


<span className="
font-semibold
text-cyan-300
">

{strength.label}

</span>


</div>





<div className="
mt-4
h-3
overflow-hidden
rounded-full
bg-white/10
">


<div

style={{
width:
strength.width
}}

className="
h-full
rounded-full
bg-cyan-400
transition-all
duration-500
"

/>


</div>



<p className="
mt-5
text-sm
leading-7
text-zinc-400
">

For better security use longer passwords with uppercase,
lowercase, numbers and symbols.

</p>



</motion.section>
{/* PASSWORD STATISTICS */}


<motion.section

initial={{
opacity:0,
y:20
}}

whileInView={{
opacity:1,
y:0
}}

viewport={{
once:true
}}

className="
mt-10
grid
gap-6
sm:grid-cols-2
xl:grid-cols-4
"

>


<div className="
rounded-2xl
border
border-white/10
bg-[#111827]
p-6
">


<p className="
text-sm
text-zinc-500
">

Password Length

</p>


<h3 className="
mt-3
text-3xl
font-bold
text-white
">

{length}

</h3>


</div>





<div className="
rounded-2xl
border
border-white/10
bg-[#111827]
p-6
">


<p className="
text-sm
text-zinc-500
">

Character Pool

</p>


<h3 className="
mt-3
text-3xl
font-bold
text-cyan-400
">

{characterCount}

</h3>


</div>





<div className="
rounded-2xl
border
border-white/10
bg-[#111827]
p-6
">


<p className="
text-sm
text-zinc-500
">

Security Level

</p>


<h3 className="
mt-3
text-2xl
font-bold
text-white
">

{strength.label}

</h3>


</div>





<div className="
rounded-2xl
border
border-white/10
bg-[#111827]
p-6
">


<p className="
text-sm
text-zinc-500
">

Storage

</p>


<h3 className="
mt-3
text-2xl
font-bold
text-green-400
">

Local Only

</h3>


</div>



</motion.section>









{/* PASSWORD HISTORY */}



<motion.section

initial={{
opacity:0,
y:20
}}

whileInView={{
opacity:1,
y:0
}}

viewport={{
once:true
}}

className="
mt-10
rounded-3xl
border
border-white/10
bg-[#111827]
p-6
md:p-8
"

>


<div className="
flex
items-center
justify-between
">


<h2 className="
text-2xl
font-bold
text-white
">

Recent Passwords

</h2>


<span className="
rounded-full
bg-cyan-500/10
px-4
py-2
text-sm
text-cyan-300
">

Temporary

</span>


</div>




{
history.length === 0 ? (


<div className="
mt-8
rounded-2xl
bg-[#070b16]
p-6
text-center
text-zinc-500
">

Generated passwords will appear here.

</div>


):(


<div className="
mt-8
space-y-4
">


{
history.map((item,index)=>(


<div

key={index}

className="
flex
items-center
justify-between
gap-4
rounded-2xl
bg-[#070b16]
p-5
"


>


<p className="
break-all
font-medium
tracking-wider
text-white
">

{item}

</p>



<button

onClick={()=>
navigator.clipboard.writeText(item)
}

className="
rounded-xl
border
border-white/10
px-4
py-2
text-sm
text-cyan-300
transition
hover:border-cyan-400
"


>

Copy

</button>



</div>


))

}


</div>


)

}



</motion.section>









{/* SECURITY INFORMATION */}



<motion.section

initial={{
opacity:0,
y:20
}}

whileInView={{
opacity:1,
y:0
}}

viewport={{
once:true
}}

className="
mt-10
rounded-3xl
border
border-white/10
bg-[#111827]
p-8
"


>


<div className="
flex
items-center
gap-3
">


<div className="
rounded-xl
bg-green-500/10
p-3
">

<ShieldCheck
className="text-green-400"
/>

</div>



<h2 className="
text-2xl
font-bold
text-white
">

Your Privacy Matters

</h2>


</div>




<div className="
mt-8
grid
gap-6
md:grid-cols-3
">


<div className="
rounded-2xl
bg-[#070b16]
p-6
">


<h3 className="
font-semibold
text-white
">

No Data Stored

</h3>


<p className="
mt-3
text-sm
leading-7
text-zinc-400
">

Passwords are generated locally and are never saved.

</p>


</div>





<div className="
rounded-2xl
bg-[#070b16]
p-6
">


<h3 className="
font-semibold
text-white
">

Browser Based

</h3>


<p className="
mt-3
text-sm
leading-7
text-zinc-400
">

All processing happens directly on your device.

</p>


</div>





<div className="
rounded-2xl
bg-[#070b16]
p-6
">


<h3 className="
font-semibold
text-white
">

Secure Generation

</h3>


<p className="
mt-3
text-sm
leading-7
text-zinc-400
">

Create unique passwords with customizable security options.

</p>


</div>



</div>



</motion.section>
{/* SEO CONTENT */}


<motion.section

initial={{
opacity:0,
y:20
}}

whileInView={{
opacity:1,
y:0
}}

viewport={{
once:true
}}

className="
mt-16
rounded-3xl
border
border-white/10
bg-[#111827]
p-8
"

>


<h2 className="
text-3xl
font-bold
text-white
">

Free Online Password Generator

</h2>



<p className="
mt-6
leading-8
text-zinc-400
">

MeggatronAI Password Generator helps you create strong,
secure and random passwords instantly. Generate unique
passwords with customizable length, uppercase letters,
lowercase letters, numbers and symbols.

</p>



<p className="
mt-5
leading-8
text-zinc-400
">

Your passwords are generated directly inside your browser.
Nothing is uploaded, stored, or shared. This makes it a
fast and privacy-focused password creation tool for
personal and professional use.

</p>





<div className="
mt-10
grid
gap-6
md:grid-cols-2
">


<div className="
rounded-2xl
bg-[#070b16]
p-6
">


<h3 className="
text-xl
font-semibold
text-white
">

Features

</h3>



<ul className="
mt-5
space-y-3
text-zinc-400
">


<li>
✓ Strong random password generation
</li>


<li>
✓ Adjustable password length
</li>


<li>
✓ Uppercase and lowercase support
</li>


<li>
✓ Numbers and symbols support
</li>


<li>
✓ Instant copy functionality
</li>


<li>
✓ Browser-based security
</li>


</ul>


</div>






<div className="
rounded-2xl
bg-[#070b16]
p-6
">


<h3 className="
text-xl
font-semibold
text-white
">

Best For

</h3>



<ul className="
mt-5
space-y-3
text-zinc-400
">


<li>
✓ Account security
</li>


<li>
✓ Website passwords
</li>


<li>
✓ Developer accounts
</li>


<li>
✓ Email protection
</li>


<li>
✓ Business accounts
</li>


<li>
✓ Personal privacy
</li>


</ul>


</div>



</div>



</motion.section>










{/* FAQ */}



<motion.section

initial={{
opacity:0,
y:20
}}

whileInView={{
opacity:1,
y:0
}}

viewport={{
once:true
}}

className="
mt-16
rounded-3xl
border
border-white/10
bg-[#111827]
p-8
"

>


<h2 className="
text-3xl
font-bold
text-white
">

Frequently Asked Questions

</h2>




<div className="
mt-8
space-y-6
">


<div>

<h3 className="
font-semibold
text-white
">

Is this password generator free?

</h3>


<p className="
mt-2
text-zinc-400
">

Yes. MeggatronAI Password Generator is completely free
to use.

</p>


</div>





<div>

<h3 className="
font-semibold
text-white
">

Are generated passwords stored?

</h3>


<p className="
mt-2
text-zinc-400
">

No. Passwords are generated locally in your browser and
are never stored on our servers.

</p>


</div>





<div>

<h3 className="
font-semibold
text-white
">

How strong should my password be?

</h3>


<p className="
mt-2
text-zinc-400
">

For better security, use longer passwords with a mixture
of uppercase letters, lowercase letters, numbers and
symbols.

</p>


</div>





<div>

<h3 className="
font-semibold
text-white
">

Can I use these passwords for important accounts?

</h3>


<p className="
mt-2
text-zinc-400
">

Yes. Strong randomly generated passwords are recommended
for protecting online accounts.

</p>


</div>



</div>



</motion.section>









{/* RELATED TOOLS */}



<ToolLinks

tools={[

{
name:"Word Counter",
href:"/tools/word-counter",
},

{
name:"QR Generator",
href:"/tools/qr-generator",
},

{
name:"PDF Merger",
href:"/tools/pdf-merger",
},

{
name:"Image Compressor",
href:"/tools/image-compressor",
},

]}

/>


</div>

</main>

);

}