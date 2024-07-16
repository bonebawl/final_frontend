export default function Header() {
    return (
      <>
        <div className="absolute top-0 left-0 w-full h-[10vh] bg-[url('./assets/wave.png')] bg-[length:100%_10vh] animate-wave1 z-[1000] opacity-100 rotate-180"></div>
        <div className="mix-blend-soft-light absolute top-[3vh] left-0 w-full h-[10vh] bg-[url('./assets/wave.png')] bg-[length:100%_10vh] animate-wave2 z-[999] opacity-70 rotate-180"></div>
        <div className="mix-blend-soft-light absolute top-[4vh] left-0 w-full h-[10vh] bg-[url('./assets/wave.png')] bg-[length:100%_10vh] animate-wave3 z-[998] opacity-50 rotate-180 duration-75"></div>
      </>
    );
  }