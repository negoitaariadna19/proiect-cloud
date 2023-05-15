// js/components/MainPage.jsx
import {useEffect, useState} from "react";

export default function MainPage() {
	const [records, setRecords] = useState([]);

	useEffect(() => {
		try{
			fetch('/api/records', {
				method: 'GET',
			})
				.then(response => response.json())
				.then(json => setRecords(json.data));
		}
		catch(e){
			console.log(e);
		}
	}, []);

	const deleteRecord = async (e) => {
		e.preventDefault();

		console.log(e.target.id);
		const id = e.target.id;

		try{
			fetch(`/api/records?id=${id}`, {
				method: 'DELETE',
			})
				.then(response => response.json())
				.then(json => {
					setRecords(records.filter(record => record._id !== id));
				});
		}
		catch(e){
			console.log(e);
		}
	}

	console.log(records);

	return (
		<section className={"bg-[#ddd6fe]"}>
	
			<div className={"container px-6 py-10 mx-auto"}>
				<h1 className={"w-[500px] mx-auto text-center text-6xl font-bold text-purple-600"}>Book app</h1>
				<p className={"w-[1000px] mx-auto text-center mt-4 text-3xl text-purple-600"}>This is an app that describes various books</p>
				<a href="/insert" className="mt-4 text-gray-900 bg-purple-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-400 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2">
    Inserati o carte
				</a>
				<div className={"grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3"}>
					{
						records.map(record => (
							<div key={record._id}
								className={"max-w-sm p-6 bg-[#fdf4ff] border-4 border-purple-400 rounded-lg shadow "}
							>
								<h3 className={"mb-2 text-2xl font-bold text-violet-500"}>{record.titlu}</h3>
								<p className={"font-normal "}>{record.descriere}</p>

								<button type="button"
								        onClick={deleteRecord}
								        id={record._id}
								        className="mt-4 text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2">
									Delete
								</button>
							</div>
						))
					}
				</div>
			</div>
		</section>
	)
}