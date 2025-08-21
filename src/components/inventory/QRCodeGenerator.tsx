import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Printer, QrCode as QrCodeIcon } from "lucide-react";
import QRCode from 'qrcode';
import { EWasteItem } from '@/types';
import { useToast } from '@/hooks/use-toast';

interface QRCodeGeneratorProps {
  item: EWasteItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QRCodeGenerator({ item, open, onOpenChange }: QRCodeGeneratorProps) {
  const [qrCodeDataURL, setQrCodeDataURL] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (item && open) {
      generateQRCode();
    }
  }, [item, open]);

  const generateQRCode = async () => {
    if (!item) return;
    
    setLoading(true);
    try {
      const qrData = JSON.stringify({
        id: item.id,
        name: item.name,
        payload: item.qrPayload,
        url: `${window.location.origin}/item/${item.id}`
      });

      const dataURL = await QRCode.toDataURL(qrData, {
        width: 256,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        },
        errorCorrectionLevel: 'M'
      });

      setQrCodeDataURL(dataURL);
    } catch (error) {
      console.error('Error generating QR code:', error);
      toast({
        title: "Error",
        description: "Failed to generate QR code. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadQRCode = () => {
    if (!qrCodeDataURL || !item) return;

    const link = document.createElement('a');
    link.href = qrCodeDataURL;
    link.download = `qr-code-${item.name.replace(/\s+/g, '-').toLowerCase()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Downloaded",
      description: "QR code has been downloaded successfully."
    });
  };

  const printQRCode = () => {
    if (!qrCodeDataURL || !item) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>QR Code - ${item.name}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              text-align: center;
              padding: 20px;
              margin: 0;
            }
            .qr-container {
              display: inline-block;
              padding: 20px;
              border: 2px solid #000;
              margin: 20px;
            }
            .qr-info {
              margin-top: 15px;
              font-size: 12px;
            }
            .qr-code {
              margin: 10px 0;
            }
            @media print {
              body { margin: 0; }
            }
          </style>
        </head>
        <body>
          <div class="qr-container">
            <h2>${item.name}</h2>
            <div class="qr-code">
              <img src="${qrCodeDataURL}" alt="QR Code" style="width: 200px; height: 200px;" />
            </div>
            <div class="qr-info">
              <p><strong>Serial:</strong> ${item.serialNo || 'N/A'}</p>
              <p><strong>Department:</strong> ${item.department}</p>
              <p><strong>Location:</strong> ${item.location}</p>
              <p><strong>QR Payload:</strong> ${item.qrPayload}</p>
            </div>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 250);

    toast({
      title: "Print Ready",
      description: "QR code label is ready for printing."
    });
  };

  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <QrCodeIcon className="h-5 w-5" />
            <span>QR Code Generator</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Item Info */}
          <Card className="bg-gradient-card border-0">
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
              <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                <p><span className="font-medium">Serial:</span> {item.serialNo || 'N/A'}</p>
                <p><span className="font-medium">Department:</span> {item.department}</p>
                <p className="col-span-2"><span className="font-medium">Location:</span> {item.location}</p>
              </div>
            </CardContent>
          </Card>

          {/* QR Code Display */}
          <div className="flex justify-center">
            <Card className="p-4 bg-white border-2 border-border">
              <CardContent className="p-0 flex flex-col items-center space-y-3">
                {loading ? (
                  <div className="w-64 h-64 flex items-center justify-center bg-muted rounded">
                    <QrCodeIcon className="h-12 w-12 text-muted-foreground animate-pulse" />
                  </div>
                ) : qrCodeDataURL ? (
                  <>
                    <img 
                      src={qrCodeDataURL} 
                      alt="Generated QR Code" 
                      className="w-64 h-64"
                    />
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground font-mono">
                        {item.qrPayload}
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="w-64 h-64 flex items-center justify-center bg-muted rounded">
                    <p className="text-muted-foreground">Failed to generate QR code</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-3">
            <Button
              variant="outline"
              onClick={downloadQRCode}
              disabled={!qrCodeDataURL || loading}
              className="flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>Download PNG</span>
            </Button>
            <Button
              variant="outline"
              onClick={printQRCode}
              disabled={!qrCodeDataURL || loading}
              className="flex items-center space-x-2"
            >
              <Printer className="h-4 w-4" />
              <span>Print Label</span>
            </Button>
            <Button
              onClick={generateQRCode}
              disabled={loading}
              className="bg-primary hover:bg-primary/90"
            >
              {loading ? "Generating..." : "Regenerate"}
            </Button>
          </div>

          {/* Usage Instructions */}
          <Card className="bg-muted/30 border-0">
            <CardContent className="p-4">
              <h4 className="font-medium text-sm mb-2">Usage Instructions:</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Print and attach this QR label to the item</li>
                <li>• Scan to quickly access item details and update status</li>
                <li>• Use during pickup and disposal processes</li>
                <li>• QR code contains item ID and verification data</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}