import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1 className="text-center text-lg">
        Next.js + TypeScript + Redux + Reselect
      </h1>
      <div className="flex justify-center">
        <ul>
          <li className="list-none">
            <Link href="/functional-wo-select/">
              <span className="text-blue-500 hover:text-blue-800">
                Functional w/o Select
              </span>
            </Link>
          </li>
          <li className="list-none">
            <Link href="/functional-w-select/">
              <span className="text-blue-500 hover:text-blue-800">
                Functional w/ Select
              </span>
            </Link>
          </li>
          <li className="list-none">
            <Link href="/class-wo-select/">
              <span className="text-blue-500 hover:text-blue-800">
                Class w/o Select
              </span>
            </Link>
          </li>
          <li className="list-none">
            <Link href="/class-w-select/">
              <span className="text-blue-500 hover:text-blue-800">
                Class w/ Select
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
