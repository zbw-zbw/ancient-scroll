"use client";

import { useEffect, useState } from "react";
import { beasts } from "../../data/beasts";
import { getCollectedBeasts } from "../../lib/collection";
import { IconScroll } from "@/components/icons";

export default function CollectionProgress() {
 const [count, setCount] = useState(0);

 useEffect(() => {
 const update = () => {
 setCount(getCollectedBeasts().length);
 };
 update();
 window.addEventListener("storage", update);
 const interval = setInterval(update, 1000);
 return () => {
 window.removeEventListener("storage", update);
 clearInterval(interval);
 };
 }, []);

 const percentage =
 beasts.length > 0 ? Math.round((count / beasts.length) * 100) : 0;

 return (
 <div className="flex items-center gap-3 rounded-full bg-surface/60 px-4 py-2">
 <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cinnabar/10 text-cinnabar">
        <IconScroll className="h-4 w-4" />
      </div>
 <div>
 <p className="font-serif text-xs text-muted">已收藏</p>
 <p className="font-serif text-sm font-medium text-ink">
 {count}/{beasts.length}
 <span className="ml-1 text-xs text-cinnabar">({percentage}%)</span>
 </p>
 </div>
 </div>
 );
}
