/* eslint-disable react/prop-types */
import SubjectCard from "../SubjectCard/SubjectCard";

const Subjects = ({ subjects, setupdHandler }) => {
	function compare(a, b) {
		if (a?.subjectCode < b?.subjectCode) {
			return -1;
		}
		if (a?.subjectCode > b?.subjectCode) {
			return 1;
		}

		return 0;
	}

	// console.log(subjects);
	subjects.sort(compare);
	console.log(subjects);
	return (
		<section className="subjects">
			{!subjects.length ? (
				<h1>No subjects found</h1>
			) : (
				subjects.map((subject) => {
					// console.log(subject);
					return (
						<SubjectCard
							key={subject?.id}
							subject={subject}
							setupdHandler={setupdHandler}
						/>
					);
					// <h1>hello</h1>
				})
			)}
			{/* <SubjectCard subject={subjects[0]} /> */}
			{/* <SubjectCard subject={subjects[1]} /> */}
			{/* <SubjectCard />
				<SubjectCard />
				<SubjectCard />
				<SubjectCard /> */}
		</section>
	);
};

export default Subjects;
