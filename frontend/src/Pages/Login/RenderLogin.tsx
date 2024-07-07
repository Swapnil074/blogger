import { useState } from "react";
import { EvervaultCard } from "../../Components/ui/evervault-card";

function RenderLogin({ handleSubmit }) {
  const [existingUser, setExistingUser] = useState(true);
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const handleFormSubmit = (e, type) => {
    e.preventDefault();
    handleSubmit(type, userData);
  };

  return (
    <div style={{ maxHeight: '100vh', maxWidth: '100vw' }} className="relative flex items-center justify-center">
      <EvervaultCard />
      {!existingUser ? (
        <div
          className="absolute z-10 flex flex-col justify-center px-6 py-12 lg:px-8"
          style={{ position: 'absolute', top: '15vh', left: '32vw' }}
        >
          <div className="sm:mx-auto sm:max-w-sm bg-white p-8 rounded-lg shadow-lg border border-gray-300 min-w-80">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Create an account
            </h2>

            <div className="mt-10">
              <form className="space-y-6" onSubmit={(e) => handleFormSubmit(e, 'signup')}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={userData.email}
                      onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                      required
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm px-1.5 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={userData.password}
                      onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                      required
                      autoComplete="current-password"
                      className="block w-full rounded-md border-0 py-1.5 px-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    Sign up
                  </button>
                </div>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-blue-600 hover:text-blue-500"
                    onClick={() => setExistingUser(true)}
                  >
                    Already a member? Sign in
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="absolute z-10 flex flex-col justify-center px-6 py-12 lg:px-8"
          style={{ position: 'absolute', top: '15vh', left: '32vw' }}
        >
          <div className="sm:mx-auto sm:max-w-sm bg-white p-8 rounded-lg shadow-lg border border-gray-300 min-w-80">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>

            <div className="mt-10">
              <form className="space-y-6" onSubmit={(e) => handleFormSubmit(e, 'signin')}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={userData.email}
                      onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm px-1.5 ring-1 ring-inset ring-gray-300 placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6 bg-white"
                    />
                  </div>
                </div>



                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    Sign in
                  </button>
                </div>
                <div className="text-sm">
                  <a
                    className="font-semibold text-blue-600 hover:text-blue-500"
                    onClick={() => setExistingUser(false)}
                  >
                    Register?
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RenderLogin;
