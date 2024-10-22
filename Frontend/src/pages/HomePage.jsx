import React from "react";
import { useMediaQuery } from "react-responsive";
import {
  SparklesIcon,
  DeviceTabletIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import mainLogo from "../assets/inkwise_logo.png";

const HomePage = () => {
  const desktopMode = useMediaQuery({ query: '(min-width: 1224px)' });
  return desktopMode ? (
    <div className="h-screen">
      <div className="bg-slate-200 h-[500px] flex items-center justify-center ">
        <div className="flex items-center flex-col">
          <div className="flex items-center justify-center">
            <img className="h-20 w-20" src={mainLogo} alt="" />
            <h1 className="font-bold text-[50px] p-3">Welcome to Inkwise</h1>
          </div>
          <p className="p-3 text-gray-500 font-bold">
            An intuitive whiteboard for students and professionals to brainstorm, take notes, and draw.
          </p>
          <div className="p-3">
            <Link to="/signup">
              <li
                className="flex items-center space-x-3 border p-2 px-6 rounded-md text-white bg-black hover:bg-blue-600 transition"
                type="button">
                Get Started
              </li>
            </Link>
          </div>
          <p className="text-gray-500">
            Already have an account?{" "}
            <span className="underline cursor-pointer text-blue-500">
              <Link to="/login">Login in Here</Link>
            </span>
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center py-10">
        <div className="p-10 flex items-center justify-center space-x-10">
          <FeatureDescription
            Icon={SparklesIcon}
            title={"Enhance with AI"}
            desc={"Utilize AI to brainstorm and organize ideas."}
          />
          <FeatureDescription
            Icon={ArrowDownTrayIcon}
            title={"Download"}
            desc={"Download your whiteboard creations with ease."}
          />
          <FeatureDescription
            Icon={DeviceTabletIcon}
            title={"Multi-Device"}
            desc={"Access your whiteboard from any device."}
          />
        </div>
      </div>
    </div>
  ) : (
    <div>
      <div className="bg-slate-200 py-10 flex items-center justify-center ">
        <div className="flex items-center flex-col">
          <img className="h-20 w-20" src={mainLogo} alt="" />
          <div className="flex items-center justify-center">
            <h1 className="font-bold text-[50px] text-center">Welcome to Inkwise</h1>
          </div>
          <p className="p-3 text-gray-500 font-bold text-center">
            An intuitive whiteboard for students and professionals to brainstorm, take notes, and draw.
          </p>
          <div className="p-3">
            <Link to="/signup">
              <li
                className="flex items-center space-x-3 border p-2 px-6 rounded-md text-white bg-black hover:bg-blue-600 transition"
                type="button">
                Get Started
              </li>
            </Link>
          </div>
          <p className="text-gray-500">
            Already have an account?{" "}
            <span className="underline cursor-pointer text-blue-500">
              <Link to="/login">Login in Here</Link>
            </span>
          </p>
        </div>
      </div>
      <div className="items-center justify-center py-10">
        <div className="p-10 items-center justify-center">
          <FeatureDescription
            Icon={SparklesIcon}
            title={"Enhance with AI"}
            desc={"Utilize AI to brainstorm and organize ideas."}
          />
          <FeatureDescription
            Icon={ArrowDownTrayIcon}
            title={"Download"}
            desc={"Download your whiteboard creations with ease."}
          />
          <FeatureDescription
            Icon={DeviceTabletIcon}
            title={"Multi-Device"}
            desc={"Access your whiteboard from any device."}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;

const FeatureDescription = ({Icon, title, desc}) => {
  return (
    <div className="flex items-center flex-col mb-5">
      <div className="p-3">
        <Icons className="text-center" IconComponent={Icon} />
      </div>
      <h1 className="font-bold text-[28px] p-3 text-center">{title}</h1>
      <p className=" mb-4 text-gray-500 text-center">{desc}</p>
    </div>
  );
};

const Icons = ({IconComponent}) => {
  return (
    <div className="h-10 w-10">
      <IconComponent className="text-[50px]" />
    </div>
  );
};
