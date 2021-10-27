export default async function handler(req, res) {
  const ckanURL = process.env.CKAN_URL;
  const response = await fetch(`${ckanURL}/package_search`)
  const data = await response.json();

  res.status(200).json(data.result);
}
