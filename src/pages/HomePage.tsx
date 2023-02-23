import React from "react";
import { EditForm } from "../components/EditForm";
import { Section } from "../components/Section";
import { Slider } from "../components/Slider";

export const HomePage: React.FC = () => {
  return (
    <Section title="Реклама">
      <EditForm elementType="slider" ID="testSlider">
        <Slider ID="testSlider" autoPlayTime={4000} />
      </EditForm>
    </Section>
  );
};
