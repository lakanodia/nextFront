import Home from "../page";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ru" }];
}

export default function LocaleHome({ params }: { params: { locale: string } }) {
  return <Home params={params} />;
}
