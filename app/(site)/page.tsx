import Header from "@/components/Header";
import ListItem from "@/components/ListItem";
import getSongs from "@/lib/actions/getSongs";
import PageContent from "./components/PageContent";
import PageContainer from "@/components/PageContainer";

export const revalidate = 0;

const Home = async () => {
  const songs = await getSongs();

  return (
    <PageContainer>
      <Header>
        <p className="text-3xl font-semibold text-white">Welcome back</p>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          <ListItem name="Liked Songs" image="/images/liked.png" href="liked" />
        </div>
      </Header>
      <section className="mb-7 mt-4 px-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">Newest Songs</h2>
        </div>
        <PageContent songs={songs.slice(0, 6)} />
      </section>
    </PageContainer>
  );
};

export default Home;
