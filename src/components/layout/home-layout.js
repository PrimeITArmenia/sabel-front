import style from "./layout.module.scss";
import {
  Header,
  Subheader,
  Footer,
  Head,
  ScrollToTopButton,
} from "@/components/index";

function HomeLayout({
  children = null,
  hasSubheader = false,
  hasFooter = false,
}) {
  return (
    <>
      <Head />
      <Header />
      {hasSubheader && <Subheader />}
      {children}
      {hasFooter && <Footer />}
      <ScrollToTopButton />
    </>
  );
}

export default HomeLayout;
