export const getCurrentDate = () => {
	const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
	const months = [
		'Januari',
		'Februari',
		'Maret',
		'April',
		'Mei',
		'Juni',
		'Juli',
		'Agustus',
		'September',
		'Oktober',
		'November',
		'Desember',
	];

	const today = new Date();

	const day = days[today.getDay()];
	const date = today.getDate();
	const month = months[today.getMonth()];
	const year = today.getFullYear();

	return `${day}, ${date} ${month} ${year}`;
};

export const getToday = new Date().toISOString().slice(0, 10);

export const simpleTime = (fullDate: string) => {
	return fullDate.slice(11, 16);
};
