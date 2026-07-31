"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import ScrollReveal from "./ScrollReveal";

/**
 * 页面切换组件：
 * - 使用 key={pathname} 强制 React 在路由变化时重新挂载子树，
 *   配合 CSS .page-enter 动画实现入场效果（opacity + translateY）。
 * - 不再有 fade-out → fade-in 的两段式状态切换，彻底消除闪烁。
 * - 路由变化时瞬时滚动到顶部（不使用 smooth，避免可见的滚动动画）。
 * - 内嵌 ScrollReveal：每次路由变化随子树重新挂载，重新观察所有 .fade-in 元素，
 *   确保非首页也能正常触发滚动渐显动画。
 */
export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // 锁定 scroll restoration，防止浏览器恢复上次滚动位置
  useEffect(() => {
    if ("scrollRestoration" in history) {
      const original = history.scrollRestoration;
      history.scrollRestoration = "manual";
      return () => {
        history.scrollRestoration = original;
      };
    }
  }, []);

  // 路由变化时瞬时回到顶部
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
  }, [pathname]);

  return (
    <div key={pathname} className="page-enter">
      <ScrollReveal />
      {children}
    </div>
  );
}
