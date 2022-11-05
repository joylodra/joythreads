import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Feed from '../components/Feed';
import { Thread } from '../typings';
import { fetchThreads } from '../utils/fetch';
import { Toaster } from 'react-hot-toast';

interface Props {
  threads: Thread[]
};

const Home = ({ threads }: Props) => {

  return (
    <div>
      <Head>
        <title>joythreads</title>
        <meta name="description" content="being fast, free, and fun" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Toaster />

      <main>
        <Feed threads={threads} />
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const threads = await fetchThreads();

  return {
    props: {
      threads
    }
  };
};

export default Home;