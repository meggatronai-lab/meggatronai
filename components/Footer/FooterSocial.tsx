import Link from "next/link";

import {
  FaGithub,
  FaLinkedin,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";


const socials = [
  {
    name: "GitHub",
    icon: FaGithub,
    href: "#",
    color: "text-white",
  },
  {
    name: "X",
    icon: FaXTwitter,
    href: "#",
    color: "text-white",
  },
  {
    name: "LinkedIn",
    icon: FaLinkedin,
    href: "#",
    color: "text-[#0A66C2]",
  },
  {
    name: "Instagram",
    icon: FaInstagram,
    href: "#",
    color: "text-[#E4405F]",
  },
  {
    name: "YouTube",
    icon: FaYoutube,
    href: "#",
    color: "text-[#FF0000]",
  },
];


export default function FooterSocial() {
  return (
    <section className="px-6 py-20">

      <div className="mx-auto max-w-7xl">


        {/* Heading */}

        <div className="text-center">

          <h2
            className="
            text-3xl
            sm:text-4xl
            lg:text-5xl
            font-black
            tracking-tight
            bg-gradient-to-r
            from-white
            via-white
            to-cyan-400
            bg-clip-text
            text-transparent
            "
          >
            Join Our Community
          </h2>


          <p className="mt-4 text-zinc-400">
            Follow MeggatronAI for new tools, AI updates and productivity tips.
          </p>

        </div>



        {/* Social Buttons */}

        <div className="mt-12 flex flex-wrap justify-center gap-6">

          {socials.map((social) => {

            const Icon = social.icon;


            return (

              <div
                key={social.name}
                className="
                transition-all
                duration-300
                hover:-translate-y-2
                hover:rotate-6
                hover:scale-110
                "
              >

                <Link
                  href={social.href}
                  aria-label={social.name}
                  className="
                  group
                  flex
                  h-14
                  w-14
                  sm:h-16
                  sm:w-16
                  md:h-20
                  md:w-20
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/10
                  bg-white/5
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:border-cyan-400
                  hover:bg-cyan-400/10
                  hover:shadow-[0_0_40px_rgba(34,211,238,.35)]
                  "
                >

                  <Icon
                    size={30}
                    className={`
                    ${social.color}
                    transition-all
                    duration-300
                    group-hover:text-cyan-400
                    `}
                  />

                </Link>

              </div>

            );

          })}

        </div>


      </div>

    </section>
  );
}