import { AuditToken } from "@/hooks/conversations";
import { randomElement, randomInteger, randomUUID } from "./random";

export function getRandomTokens(): AuditToken[] {
  const values: Record<"body" | "subhead", string[]> = {
    body: [
      "Fashion is made to become unfashionable. I have my favourite fashion decade, yes, yes, yes: '60s. It was a sort of little revolution; the clothes were amazing but not too exaggerated. Over the years I have learned that what is important in a dress is the woman who is wearing it. I think God is the most fantastic designer. We look our best in subdued colors, sophisticated cuts, and a general air of sleek understatement.",
      "I can design a collection in a day and I always do, cause I've always got a load of Italians on my back, moaning that it's late. I don't try to be in fashion; I don't try to follow trends. You just end up out of fashion that way. I can design a collection in a day and I always do, cause I've always got a load of Italians on my back, moaning that it's late. I didn't consider myself a fashion designer at all at the time of punk. I was just using fashion as a way to express my resistance and to be rebellious. I came from the country, and by the time I got to London, I considered myself to be very stupid. It was my ambition to understand the world I live in. I want people to be afraid of the women I dress.",
      "We have got to change our ethics and our financial system and our whole way of understanding the world. It has to be a world in which people live rather than die; a sustainable world. It could be great. My breakfast is very important. Money doesn't buy elegance. You can take an inexpensive sheath, add a pretty scarf, gray shoes, and a wonderful bag, and it will always be elegant. I adore the challenge of creating truly modern clothes, where a woman's personality and sense of self are revealed. I want people to see the dress, but focus on the woman. If I had the power, I would ban leggings.",
      "Women are women, and hurray for that. It's useless to send models out on the runway to cry. I like the body. I like to design everything to do with the body. What I hate is nasty, ugly people. Age is something only in your head or a stereotype. Age means nothing when you are passionate about something.",
    ],
    subhead: [
      "I think it's an old fashioned notion that fashion needs to be exclusive to be fashionable.",
      "I get ideas about what's essential when packing my suitcase.",
      "Grunge is a hippied romantic version of punk.",
      "I don't like trends. They tend to make everybody look the same.",
    ],
  };

  return Array.from({ length: randomInteger(10, 3) }, () => {
    const randomType = randomElement<"body" | "subhead">(["body", "subhead"])!;
    return {
      id: randomUUID(),
      type: randomType,
      message: randomElement(values[randomType])!,
    };
  });
}
