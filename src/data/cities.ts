import { City } from "../models/city";

// Hardcoded cities data, which could and has to be got from a database via API
export const cities: City[] = [
  { id: 1, name: 'London', lat: '51.507351', lon: '-0.127758' },
  { id: 2, name: 'Paris', lat: '48.856613', lon: '2.352222' },
  { id: 3, name: 'Berlin', lat: '52.520008', lon: '13.404954' },
  { id: 4, name: 'Sofia', lat: '42.697708', lon: '23.321867' },
  { id: 5, name: 'Stockholm', lat: '59.329323', lon: '18.068581' },
  { id: 6, name: 'Rome', lat: '41.902782', lon: '12.496366' },
  { id: 7, name: 'Brussels', lat: '50.8505', lon: '4.3488' },
];
