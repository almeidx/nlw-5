import axios from 'axios';
import { GetStaticProps, InferGetStaticPropsType } from 'next';

interface FileInfo {
  url: string;
  type: string;
  duration: number;
}

interface Episode {
  id: string;
  title: string;
  members: string;
  published_at: string;
  thumbnail: string;
  description: string;
  file: FileInfo;
}

export const getStaticProps: GetStaticProps<{
  episodes: Episode[];
}> = async () => {
  const { data } = await axios.get<Episode[]>('http://localhost:3333/episodes');

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8,
  };
};

export default function Home({
  episodes,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <h1>Home</h1>
      <p>{JSON.stringify(episodes)}</p>
    </div>
  );
}
