import { COLOR_MAP } '@/types'

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute top-0 left-0 w-[300px] h-[300px] blur-3xl opacity-50 rotate-[20deg]"
        style={{ backgroundColor: COLOR_MAP.red }}
      />
      <div
        className="absolute top-0 right-0 w-[280px] h-[280px] blur-3xl opacity-50 rotate-[30deg]"
        style={{ backgroundColor: COLOR_MAP.green }}
      />
      <div
        className="absolute bottom-0 left-0 w-[300px] h-[300px] blur-3xl opacity-50 rotate-[25deg]"
        style={{ backgroundColor: COLOR_MAP.blue }}
      />
      <div
        className="absolute bottom-0 right-0 w-[320px] h-[320px] blur-3xl opacity-50 rotate-[15deg]"
        style={{ backgroundColor: COLOR_MAP.yellow }}
      />
    </div>
  );
}
