function Layout({ children }) {
  return (
    <div className="App w-screen h-screen p-4">
      <header>
        <h1 className="text-3xl font-extrabold">
          DVS Mentorship 2023 - cohort 1
        </h1>
      </header>
      {children}
    </div>
  )
}

export default Layout