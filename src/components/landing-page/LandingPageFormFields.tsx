import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { GripVertical, Plus, Trash2, Settings2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import type { LandingPageData, FormField } from "@/pages/LandingPageWizard";

interface LandingPageFormFieldsProps {
  data: LandingPageData;
  updateData: (updates: Partial<LandingPageData>) => void;
}

const fieldTypes = [
  { value: "text", label: "Text" },
  { value: "email", label: "Email" },
  { value: "url", label: "URL" },
  { value: "number", label: "Number" },
  { value: "textarea", label: "Long Text" },
  { value: "select", label: "Dropdown" },
];

export function LandingPageFormFields({ data, updateData }: LandingPageFormFieldsProps) {
  const [editingField, setEditingField] = useState<string | null>(null);

  const addField = () => {
    const newField: FormField = {
      id: Date.now().toString(),
      label: "New Field",
      type: "text",
      required: false,
      placeholder: "",
    };
    updateData({ formFields: [...data.formFields, newField] });
  };

  const updateField = (id: string, updates: Partial<FormField>) => {
    updateData({
      formFields: data.formFields.map((field) =>
        field.id === id ? { ...field, ...updates } : field
      ),
    });
  };

  const removeField = (id: string) => {
    updateData({
      formFields: data.formFields.filter((field) => field.id !== id),
    });
  };

  const moveField = (index: number, direction: "up" | "down") => {
    const newFields = [...data.formFields];
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= newFields.length) return;
    [newFields[index], newFields[newIndex]] = [newFields[newIndex], newFields[index]];
    updateData({ formFields: newFields });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Form Fields</h2>
          <p className="text-sm text-muted-foreground">
            Configure what information you want to collect from creators
          </p>
        </div>
        <Button onClick={addField} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Field
        </Button>
      </div>

      <div className="space-y-3">
        {data.formFields.map((field, index) => (
          <Card key={field.id} className="group">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex flex-col gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => moveField(index, "up")}
                  disabled={index === 0}
                >
                  <GripVertical className="h-4 w-4 rotate-90" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => moveField(index, "down")}
                  disabled={index === data.formFields.length - 1}
                >
                  <GripVertical className="h-4 w-4 rotate-90" />
                </Button>
              </div>

              <div className="flex-1 grid gap-4 md:grid-cols-3">
                <div className="space-y-1">
                  <Label className="text-xs">Label</Label>
                  <Input
                    value={field.label}
                    onChange={(e) => updateField(field.id, { label: e.target.value })}
                    placeholder="Field label"
                  />
                </div>

                <div className="space-y-1">
                  <Label className="text-xs">Type</Label>
                  <Select
                    value={field.type}
                    onValueChange={(value) =>
                      updateField(field.id, { type: value as FormField["type"] })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {fieldTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end gap-4">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={field.required}
                      onCheckedChange={(checked) =>
                        updateField(field.id, { required: checked })
                      }
                    />
                    <Label className="text-xs">Required</Label>
                  </div>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Settings2 className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80" align="end">
                      <div className="space-y-4">
                        <h4 className="font-medium">Field Settings</h4>
                        <div className="space-y-2">
                          <Label>Placeholder</Label>
                          <Input
                            value={field.placeholder || ""}
                            onChange={(e) =>
                              updateField(field.id, { placeholder: e.target.value })
                            }
                            placeholder="Enter placeholder text"
                          />
                        </div>
                        {field.type === "select" && (
                          <div className="space-y-2">
                            <Label>Options (one per line)</Label>
                            <Textarea
                              value={field.options?.join("\n") || ""}
                              onChange={(e) =>
                                updateField(field.id, {
                                  options: e.target.value.split("\n").filter(Boolean),
                                })
                              }
                              placeholder="Option 1&#10;Option 2&#10;Option 3"
                              rows={4}
                            />
                          </div>
                        )}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeField(field.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}

        {data.formFields.length === 0 && (
          <div className="rounded-lg border-2 border-dashed p-8 text-center">
            <p className="text-muted-foreground">No fields added yet</p>
            <Button onClick={addField} variant="outline" className="mt-4">
              <Plus className="mr-2 h-4 w-4" />
              Add Your First Field
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
