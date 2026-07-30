"use client";

import { useEffect } from "react";

/**
 * 引用计数式 body 滚动锁。
 *
 * 对抗式审查修复：多个弹窗（BeastDetail + BeastShareModal 等）可能嵌套共存，
 * 若每个弹窗各自直接读写 document.body.style.overflow，内层弹窗关闭时会
 * 把外层弹窗的滚动锁一并清掉，导致弹窗仍开着但背景可滚动。
 * 通过模块级计数，仅当锁数量从 0→1 时加锁、1→0 时解锁。
 */
let lockCount = 0;
let previousOverflow = "";

export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    if (lockCount === 0) {
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    }
    lockCount += 1;

    return () => {
      lockCount = Math.max(0, lockCount - 1);
      if (lockCount === 0) {
        document.body.style.overflow = previousOverflow;
      }
    };
  }, [locked]);
}
