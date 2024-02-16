import { Suspense } from "react";

type ContentProps = {
  children: React.JSX.Element;
};
export const Content = ({ children }: ContentProps) => {
  return (
    <div className="content">
      <Suspense fallback={"Loading..."}>
        <div>{children}</div>
      </Suspense>
    </div>
  );
};
