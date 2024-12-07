"use client";

import React, { useRef, useState, useMemo } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader, Paperclip, ArrowUpRight } from 'lucide-react';
import imageCompression from "browser-image-compression";
import { useAccount } from "wagmi";
import { useCapabilities, useWriteContracts } from 'wagmi/experimental'
import { contractABI, CONTRACT_ADDRESS } from "@/lib/contract";
import lighthouse from "@lighthouse-web3/sdk";

const SubmitReport = () => {
  const [fileBase64, setFileBase64] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [processing, setProcessing] = useState(false);
  const [lat, setLat] = useState<number | null>(null);
  const [long, setLong] = useState<number | null>(null);
  const [id, setId] = useState<string | undefined>(undefined);
  const [gpsProcessing, setGpsProcessing] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>(null);
  const account = useAccount();
  const { writeContracts } = useWriteContracts({
    mutation: { onSuccess: (id) => setId(id) },
  });
  const { data: availableCapabilities } = useCapabilities({
    account: account.address,
  });

  const capabilities = useMemo(() => {
    if (!availableCapabilities || !account.chainId) return {};
    const capabilitiesForChain = availableCapabilities[account.chainId];
    if (
      capabilitiesForChain["paymasterService"] &&
      capabilitiesForChain["paymasterService"].supported
    ) {
      return {
        paymasterService: {
          url: `https://api.developer.coinbase.com/rpc/v1/base/LyT_0lKAx57z6hEjpTxTeq9ToxFOtlNv`,
        },
      };
    }
    return {};
  }, [availableCapabilities, account.chainId]);

  const base64ToFile = (base64: string, filename: string) => {
    const arr = base64.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : '';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

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
        `http://localhost:8080/api/submit-content`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok && data.isMatching) {
        const sevScore = Math.round(data.severity_score / 2);
        const category = data?.category || "Others";
        const details = JSON.stringify({ title, description });
        const location = JSON.stringify({ lat, long });

        // Prepare the file for upload
        const file = base64ToFile(fileBase64, `${Date.now()}.jpg`);
        const uploadResp = await lighthouse.upload([file], '1d7a4666.078c09b786c844d8ab70d56054d33836');
        const cID = uploadResp.data.Hash;

        setSubmittedData({ details, location, cID, category, sevScore });

        toast({
          title: "Success", 
          description: "Report content submitted successfully!",
        });
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

  const handleBlockchainSubmit = () => {
    if (!submittedData) {
      toast({
        title: "Error",
        description: "Please submit the report content first",
      });
      return;
    }

    const { details, location, cID, category, sevScore } = submittedData;

    writeContracts({
      contracts: [
        {
          address: CONTRACT_ADDRESS,
          abi: contractABI as any,
          functionName: "submitReport",
          args: [details, location, cID, category, sevScore],
        },
      ],
      capabilities,
    });

    toast({
      title: "Success",
      description: "Report submitted to blockchain",
    });

    router.push("/dashboard");
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
                  Submit Report Content
                  <ArrowUpRight className="ml-2" />
                </>
              )}
            </Button>
          </form>
          <Button 
            onClick={handleBlockchainSubmit}
            className="w-full mt-4"
            disabled={!submittedData}
          >
            Submit Report to Blockchain
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubmitReport;

