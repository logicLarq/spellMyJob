"use client";

import { useState, useEffect, useRef } from "react";
import { FaCompactDisc, FaQuestionCircle } from "react-icons/fa";
import Link from "next/link";


const MusicToggle = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/harrypotter.mp3");
      audioRef.current.loop = true;
    }

    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }

    return () => {
      audioRef.current?.pause();
    };
  }, [isPlaying]);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-center space-y-3">
      {/* Help & Support Button */}
      <Link
        href="https://linktr.ee/logiclarq" >   
        <button
            className="bg-gryffindor-gold hover:bg-ravenclaw-bronze  text-white p-3 rounded-full shadow-md transition-all"
            aria-label="Help and Support"
        >
            <FaQuestionCircle className="text-xl" />
        </button>
      </Link>

      {/* Music Toggle Button */}
      <button
        onClick={() => setIsPlaying((prev) => !prev)}
        className="p-4 rounded-full transition-all shadow-md"
        aria-label="Toggle music"
      >
        <FaCompactDisc
          className={`text-5xl transition-all ${
            isPlaying
              ? "text-[#D4AF37] animate-spin"
              : "text-[#888] grayscale"
          }`}
        />
      </button>
    </div>
  );
};

export default MusicToggle;
