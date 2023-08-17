import React, { FC } from "react";
import * as Slider from "@radix-ui/react-slider";

interface SongTimeControlSliderProps {
  duration: number;
  currentTime: number;
  onChange: (value: number) => void;
}

const SongTimeControlSlider: FC<SongTimeControlSliderProps> = ({
  currentTime,
  duration,
  onChange,
}) => {
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  };
  return (
    <Slider.Root
      className={`relative flex h-5 w-full touch-none select-none items-center`}
      defaultValue={[0]}
      value={[currentTime]}
      max={duration}
      onValueChange={handleChange}
      step={Math.round(duration / 100)}
      aria-label="Song time control"
    >
      <Slider.Track className="relative h-[3px] grow rounded-full bg-neutral-700">
        <Slider.Range className="absolute h-full rounded-full bg-white" />
      </Slider.Track>
      <Slider.Thumb
        className="block h-2 w-2 rounded-[10px] bg-white shadow-[0_2px_10px] shadow-neutral-50 hover:bg-neutral-100 focus:shadow-[0_0_0_2px] focus:shadow-neutral-100 focus:outline-none"
        aria-label="Current time"
      />
    </Slider.Root>
  );
};

export default SongTimeControlSlider;
