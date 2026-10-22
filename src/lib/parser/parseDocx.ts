export async function parseDocx(data: ArrayBuffer): Promise<string> {
  // Loaded lazily to keep the initial bundle small.
  const mammoth = await import('mammoth');
  const result = await mammoth.extractRawText({ arrayBuffer: data });
  return result.value;
}
