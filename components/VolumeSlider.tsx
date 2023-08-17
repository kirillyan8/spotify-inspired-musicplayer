import React, { FC } from "react";
import * as Slider from "@radix-ui/react-slider";

interface VolumeSliderProps {
  value?: number;
  onChange?: (value: number) => void;
}

const VolumeSlider: FC<VolumeSliderProps> = ({ value = 0.5, onChange }) => {
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  };
  return (
    <div>
      <Slider.Root
        className="relative flex h-5 w-[175px] touch-none select-none items-center"
        defaultValue={[0.5]}
        onValueChange={handleChange}
        value={[value]}
        max={1}
        step={0.01}
        aria-label="volume"
      >
        <Slider.Track className="relative h-[3px] grow rounded-full bg-neutral-700">
          <Slider.Range className="absolute h-full rounded-full bg-white" />
        </Slider.Track>
        <Slider.Thumb
          className="block h-5 w-5 cursor-pointer rounded-[10px] bg-white shadow-[0_2px_10px] shadow-neutral-50 hover:bg-neutral-50 focus:shadow-[0_0_0_3px] focus:shadow-neutral-50 focus:outline-none"
          aria-label="Volume"
        />
      </Slider.Root>
    </div>
  );
};

export default VolumeSlider;
