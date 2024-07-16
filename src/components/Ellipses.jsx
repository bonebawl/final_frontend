export default function Ellipses(props) {
  let elemClass = "absolute rounded-full mix-blend-color-burn mouse";

  if (props.type === "Ellipses-1") {
    elemClass += " bg-[#B3B3B3]";
  } else if (props.type === "Ellipses-2") {
    elemClass += " bg-[#D9D9D9]";
  }

  if (props.className) {
    elemClass += " " + props.className;
  }

  return (
    <div className={elemClass} value={props.value}>
      {props.children}
    </div>
  );
}