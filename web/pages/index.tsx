import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Webhook Buddy</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          paddingTop: '40px',
          paddingBottom: '40px',
          backgroundColor: '#f5f5f5',
          height: '100vh',
        }}
        className="text-center"
      >
        <div
          style={{
            width: '100%',
            maxWidth: '420px',
            padding: '15px',
            margin: 'auto',
          }}
        >
          <form>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

            <div className="form-floating">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>

            <button
              className="w-100 btn btn-lg btn-primary mt-3"
              type="submit"
            >
              Sign in
            </button>
            <p className="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Home;
