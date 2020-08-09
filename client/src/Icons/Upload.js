import * as React from "react";

function SvgUpload(props) {
  return (
    <svg viewBox="0 0 500 500" width={30} height={30} {...props}>
      <linearGradient
        id="upload_svg__a"
        gradientUnits="userSpaceOnUse"
        x1={256}
        x2={256}
        y1={496}
        y2={16}
      >
        <stop offset={0} stopColor="#12c2e9" />
        <stop offset={0.056} stopColor="#19bfe9" />
        <stop offset={0.137} stopColor="#2db6ea" />
        <stop offset={0.235} stopColor="#4da7ea" />
        <stop offset={0.344} stopColor="#7993eb" />
        <stop offset={0.462} stopColor="#b279ed" />
        <stop offset={0.497} stopColor="#c471ed" />
        <stop offset={1} stopColor="#f64f59" />
      </linearGradient>
      <path
        d="M408 496a40.045 40.045 0 0040-40V120a8 8 0 00-2.343-5.657l-96-96A8 8 0 00344 16H104a40.045 40.045 0 00-40 40v400a40.045 40.045 0 0040 40zM352 43.313L420.687 112H376a24.027 24.027 0 01-24-24zM80 456V56a24.028 24.028 0 0124-24h232v56a40.045 40.045 0 0040 40h56v328a24.028 24.028 0 01-24 24H104a24.028 24.028 0 01-24-24zm216-72a8 8 0 01-8 8h-64a8 8 0 010-16h64a8 8 0 018 8zM176 264h40v88a8 8 0 008 8h64a8 8 0 008-8v-88h40a8 8 0 006.146-13.121l-80-96a8 8 0 00-12.292 0l-80 96A8 8 0 00176 264zm80-91.5l62.92 75.5H288a8 8 0 00-8 8v88h-48v-88a8 8 0 00-8-8h-30.92z"
        fill="url(#upload_svg__a)"
      />
    </svg>
  );
}

export default SvgUpload;
