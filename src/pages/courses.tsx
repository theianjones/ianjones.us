import Courses from 'components/courses'
export default function CoursesPage() {
  return (
    <section className="my-3 text-gray-800">
      <h1 className="text-4xl md:text-5xl font-bold my-12 text-gray-800 font-sans dark:text-gray-300">
        Courses
      </h1>
      <Courses />
    </section>
  )
}
