export const fittingServices = [
  {
    id: 'private',
    title: 'Private fitting',
    duration: '60 MIN',
    description: 'One-to-one guidance to find your perfect silhouette and fit.',
  },
  {
    id: 'wardrobe',
    title: 'Wardrobe consultation',
    duration: '45 MIN',
    description: 'Build considered looks around the pieces you love.',
  },
  {
    id: 'alterations',
    title: 'Alterations',
    duration: '30 MIN',
    description: 'Fine adjustments to make your Atelier pieces feel just right.',
  },
];

export const getFittingService = (serviceId) =>
  fittingServices.find((service) => service.id === serviceId) ?? fittingServices[0];
