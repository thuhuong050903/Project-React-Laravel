<?php



namespace App\Http\Controllers;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use App\Models\Images;
use App\Models\apartments;

class ImagesController extends Controller
{
    public function addPhoto(Request $request, $apartmentId)
    {
        $apartment = apartments::find($apartmentId);

        if (!$apartment) {
            return response()->json(['error' => 'Apartment not found'], 404);
        }

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('photos'), $filename);
            // Save the photo information to the database
            $image = new Images();
            $image->name = $filename;
            $image->apartment_id = $apartmentId;
            $image->save();

            // Fetch related photos
            $relatedPhotos = Images::where('apartment_id', $apartmentId)->get();

            return response()->json([
                'message' => 'Photo uploaded successfully',
                'relatedPhotos' => $relatedPhotos,
            ]);
        }

        return response()->json(['error' => 'No file uploaded'], 400);
    }
    public function getRelatedPhotos($apartmentId)
    {
        $relatedPhotos = Images::where('apartment_id', $apartmentId)->get();

        return response()->json($relatedPhotos);
    }
    public function deletePhoto($photoId)
    {
        try {
            $photo = Images::findOrFail($photoId);

            // Xóa ảnh từ lưu trữ (storage)
            Storage::disk('public')->delete($photo->name);

            // Xóa ảnh từ cơ sở dữ liệu
            $photo->delete();
            return response()->json([
                'message' => 'Photo deleted successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to delete photo',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
