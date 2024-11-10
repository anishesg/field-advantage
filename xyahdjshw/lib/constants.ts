export const DISEASE_LABELS = [
  'Cassava Bacterial Blight (CBB)',
  'Cassava Brown Streak Disease (CBSD)',
  'Cassava Green Mite (CGM)',
  'Cassava Mosaic Disease (CMD)',
  'Healthy'
] as const;

export const MODEL_CONFIG = {
  modelUrl: 'https://tfhub.dev/google/cropnet/classifier/cassava_disease/1/default/1',
  imageSize: 224,
  channels: 3,
} as const;