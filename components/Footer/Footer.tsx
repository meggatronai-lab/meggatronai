import Newsletter from "./Newsletter";

import FooterLinks from "./FooterLinks";

import FooterSocial from "./FooterSocial";

import FooterBottom from "./FooterBottom";



export default function Footer() {

  return (

    <footer className="relative overflow-hidden bg-[#050816]">



      {/* Background Glow */}



      <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[180px]" />



      <div className="absolute bottom-0 right-0 h-[350px] w-[350px] rounded-full bg-teal-500/10 blur-[150px]" />



      <div className="relative z-10">



      

  <Newsletter />

<FooterLinks />

<FooterSocial />

<FooterBottom />



      </div>



    </footer>

  );

}