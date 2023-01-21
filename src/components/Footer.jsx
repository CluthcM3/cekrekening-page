import React from "react";
import { BsGithub, BsInstagram, BsFacebook } from "react-icons/bs";
function Footer() {
  return (
    <div className="h-32 w-full">
      <div className="w-full mx-auto flex justify-center">
        <div className="relative w-[90%] ">
          <div className="absolute bottom-0 top-20 right-0 md:left-24 left-0 ">
            <div className="md:h-0 h-16">
              <div className="flex justify-center">
                <a href="https://github.com/CluthcM3/cekrekening-page">
                  <BsGithub className="w-6 h-6 ml-3" />
                </a>
                <a href="#">
                  <BsInstagram className="w-6 h-6 ml-3" />
                </a>
                <a href="#">
                  <BsFacebook className="w-6 h-6 ml-3" />
                </a>
              </div>
              <p className="text-center text-sm font-semibold pt-2">
                Copyright ©2023
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
