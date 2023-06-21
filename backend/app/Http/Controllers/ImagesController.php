<?php



namespace App\Http\Controllers;

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
}
