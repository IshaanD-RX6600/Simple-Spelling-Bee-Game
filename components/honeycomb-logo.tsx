export function Honeycomb({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      {/* Center hexagon (yellow) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3">
        <div
          className="w-full h-full bg-amber-400 rotate-90 rounded-full"
          style={{ clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)" }}
        ></div>
      </div>

      {/* Top hexagon */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-1/3">
        <div
          className="w-full h-full bg-gray-200 rotate-90 rounded-full"
          style={{ clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)" }}
        ></div>
      </div>

      {/* Top right hexagon */}
      <div className="absolute top-[25%] right-[12.5%] w-1/3 h-1/3">
        <div
          className="w-full h-full bg-gray-200 rotate-90 rounded-full"
          style={{ clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)" }}
        ></div>
      </div>

      {/* Bottom right hexagon */}
      <div className="absolute bottom-[25%] right-[12.5%] w-1/3 h-1/3">
        <div
          className="w-full h-full bg-gray-200 rotate-90 rounded-full"
          style={{ clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)" }}
        ></div>
      </div>

      {/* Bottom hexagon */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-1/3">
        <div
          className="w-full h-full bg-gray-200 rotate-90 rounded-full"
          style={{ clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)" }}
        ></div>
      </div>

      {/* Bottom left hexagon */}
      <div className="absolute bottom-[25%] left-[12.5%] w-1/3 h-1/3">
        <div
          className="w-full h-full bg-gray-200 rotate-90 rounded-full"
          style={{ clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)" }}
        ></div>
      </div>

      {/* Top left hexagon */}
      <div className="absolute top-[25%] left-[12.5%] w-1/3 h-1/3">
        <div
          className="w-full h-full bg-gray-200 rotate-90 rounded-full"
          style={{ clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)" }}
        ></div>
      </div>
    </div>
  )
}
