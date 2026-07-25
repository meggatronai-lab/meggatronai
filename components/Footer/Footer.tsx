import FooterLinks from "./FooterLinks";
import FooterSocial from "./FooterSocial";
import FooterBottom from "./FooterBottom";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050816]">
      <div className="mx-auto max-w-7xl">
        <FooterLinks />
        <FooterSocial />
        <FooterBottom />
      </div>
    </footer>
  );
}