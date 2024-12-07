"use client";

import React, { useRef, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader, Paperclip, ArrowUpRight } from "lucide-react";
import imageCompression from "browser-image-compression";

const SubmitReport = () => {
  const [fileBase64, setFileBase64] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [processing, setProcessing] = useState(false);
  const [lat, setLat] = useState<number | null>(null);
  const [long, setLong] = useState<number | null>(null);
  const [gpsProcessing, setGpsProcessing] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const router = useRouter();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const fileType = file.type.split('/')[0];

    if (fileType !== 'image' && fileType !== 'video') {
      toast({
        title: "Error",
        description: "Please upload an image or video file",
      });
      return;
    }

    try {
      if (fileType === 'image') {
        const options = {
          maxSizeMB: 0.025,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };

        const compressedFile = await imageCompression(file, options);

        if (compressedFile.size > 25 * 1024) {
          toast({
            title: "Error",
            description: "Unable to compress the image to 25KB or less",
          });
          return;
        }

        const reader = new FileReader();
        reader.onload = () => {
          setFileBase64(reader.result as string);
          toast({
            title: "Success",
            description: "Image compressed and uploaded successfully!",
          });
        };
        reader.readAsDataURL(compressedFile);
      }
    } catch (error) {
      console.error("Error during file upload:", error);
      toast({
        title: "Error",
        description: "Failed to process the file",
      });
    }
  };

  const handleGPSLocGet = () => {
    setGpsProcessing(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLong(position.coords.longitude);
          setGpsProcessing(false);
        },
        (error) => {
          console.error(error);
          setGpsProcessing(false);
          toast({
            title: "Error",
            description: "Failed to get location",
          });
        }
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !fileBase64) {
      toast({
        title: "Error",
        description: "Please fill all fields",
      });
      return;
    }

    setProcessing(true);

    const formData = new FormData();
    formData.append("proof_text", `${title} - ${description}`);
    formData.append("proof_image", fileBase64);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/submit-content`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok && data.isMatching) {
        toast({
          title: "Success", 
          description: "Report submitted successfully!",
        });
        router.push("/dashboard");
      } else {
        toast({
          title: "Error",
          description: "Content validation failed",
        });
      }
    } catch (error) {
      console.error("Error submitting report:", error);
      toast({
        title: "Error",
        description: "Failed to submit report",
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Create a new report</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="py-2"
                required
              />
            </div>

            <div className="flex gap-4">
              <div className="w-full space-y-2">
                <Label>Location</Label>
                <div className="flex gap-2">
                  <Input disabled value={lat?.toString()} placeholder="Latitude" />
                  <Input disabled value={long?.toString()} placeholder="Longitude" />
                  <Button type="button" onClick={handleGPSLocGet} disabled={gpsProcessing}>
                    {gpsProcessing ? <Loader className="animate-spin" /> : "Get Location"}
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                required
              />
            </div>

            <div>
              <input
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*,video/*"
              />
              <Button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
              >
                <Paperclip className="w-4 h-4 mr-2" />
                Attach Files
              </Button>
            </div>

            {fileBase64 && (
              <div className="mt-4">
                <img
                  src={fileBase64}
                  alt="Preview"
                  className="max-h-[200px] rounded-lg"
                />
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={processing}
            >
              {processing ? (
                <Loader className="animate-spin mr-2" />
              ) : (
                <>
                  Submit Report
                  <ArrowUpRight className="ml-2" />
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubmitReport;