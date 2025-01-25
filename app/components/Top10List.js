import CSRComponent from "./CSRComponent";
import SSRComponent from "./SSRComponent";

export default function Top10List() {
  return (
    <div className="mt-8 grid grid-cols-2 gap-8">
      <CSRComponent />
      <SSRComponent />
    </div>
  );
}
