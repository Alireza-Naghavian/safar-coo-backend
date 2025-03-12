import axios from "axios";

export const reverseGeoCode = async (
  latitude: number,
  longitude: number
): Promise<string | null> => {
  try {
    const response = await axios.get(
      "https://nominatim.openstreetmap.org/reverse",
      {
        params: {
          format: "json",
          lat: latitude,
          lon: longitude,
          addressdetails: 1,
          "accept-language": "fa",
        },
        headers: {
          "User-Agent": `safar-coo/1.0 ${process.env.MYACTIVEMAIL}`,
        },
      }
    );
    if (response.data && response.data.display_name) {
      return response.data.display_name;
    }
    return null;
  } catch (error) {
    console.error("Reverse geocoding error:", error);
    return null;
  }
};
