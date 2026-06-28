function BackgroundGrid() {
  return (
    <div
      className="absolute inset-0
      opacity-[0.04]
      [background-image:linear-gradient(#ffffff_1px,transparent_1px),linear-gradient(to_right,#ffffff_1px,transparent_1px)]
      [background-size:40px_40px]"
    />
  );
}

export default BackgroundGrid;