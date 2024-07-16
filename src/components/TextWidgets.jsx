export default function TextWidgets({ type, hovered, children }) {
    if (hovered) return null;
  
    const classes = {
      Productivity: "z-[1001] h-screen bg-coverfont-outfit text-[4vw] font-semibold text-white text-center leading-[100vh] align-middle",
      Entertainment: "z-[1001] font-outfit text-[4vw] font-semibold text-white text-center leading-[50vh] align-middle",
      Educational: "z-[1001] font-outfit text-[4vw] font-semibold text-white text-center leading-[50vh] align-middle"
    };
  
    return (
      <h1 className={classes[type]}>
        {children}
      </h1>
    );
  }