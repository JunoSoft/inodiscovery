import React from "react";

const searchNav = [
  { name: "Find Car(s)" },
  { name: "Find Hotel(s)" },
  { name: "Find Event(s)" },
  { name: "Find Appartement(s)" },
  { name: "Find Tourists/ Visit(s)" },
];

export default function SearchSelection() {
  const DOMelements = searchNav.map((nav) => {
    return <div>{nav.name}</div>;
  });
  return <div>{DOMelements}</div>;
}
