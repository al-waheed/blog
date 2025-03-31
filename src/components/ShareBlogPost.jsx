import React from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
} from "react-share";
import { FaFacebook, FaTwitter, FaWhatsapp, FaLinkedin } from "react-icons/fa";

const ShareBlogPost = ({ url, title }) => {
  const socialPlatforms = [
    {
      name: "Facebook",
      ButtonComponent: FacebookShareButton,
      IconComponent: FaFacebook,
      className: "text-blue-600",
    },
    {
      name: "Twitter",
      ButtonComponent: TwitterShareButton,
      IconComponent: FaTwitter,
      className: "text-blue-400",
    },
    {
      name: "LinkedIn",
      ButtonComponent: LinkedinShareButton,
      IconComponent: FaLinkedin,
      className: "text-blue-700",
    },
    {
      name: "WhatsApp",
      ButtonComponent: WhatsappShareButton,
      IconComponent: FaWhatsapp,
      className: "text-green-500",
    },
  ];

  return (
    <div className="text-left mt-4">
      <p className="font-semibold text-sm italic mb-1">Share on:</p>
      <div className="flex gap-3">
        {socialPlatforms.map(
          ({ name, ButtonComponent, IconComponent, className }) => (
            <ButtonComponent
              key={name}
              url={url}
              title={title}
              className="hover:scale-110 transition"
            >
              <IconComponent size={20} className={className} />
            </ButtonComponent>
          )
        )}
      </div>
    </div>
  );
};

export default ShareBlogPost;
